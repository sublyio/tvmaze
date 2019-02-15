const got = require('got');
const Timer = require('./timer');
const Shows = require('./schemas').Shows;
const Episodes = require('./schemas').Episodes;

/**
 * TvmazeAdapter class
 */
module.exports = class TvmazeAdapter {
  /**
   * Creates a instance of TvmazeAdapter.
   * @param {Object} db - Mongoose database
   * @return {Void}
   */
  constructor(db, options) {
    // TVmaze use rate limit. 20 calls every 10 seconds per IP address.
    this.timer = new Timer();

    this.apiURL = 'https://api.tvmaze.com';
    this.showsURL = `${this.apiURL}/shows`;
    this.updateURL = `${this.apiURL}/updates/shows`;

    this.Shows = Shows(db);
    this.Episodes = Episodes(db);
  }

  /**
   * Download the available series with the APIs sponsored by TVmaze.
   * @param  {Number|String}  maxPage - Maximum page number
   * @param  {Boolean}  isUpdate - Is this an update request?
   * @return {Promise}
   */
  async importers(maxPage = -1, isUpdate = false) {
    let pageNum = 0;
    let watch = true;

    while (watch) {
      let imported = await this.importer(pageNum, isUpdate);

      if (pageNum === maxPage || (imported && imported.statusCode === 404)) {
        watch = false;
      }

      pageNum++;
    }
  }

  /**
   * Implementing a query to import.
   * @param  {Number|String}  pageNum - Page number
   * @param  {Boolean}  isUpdate - Is this an update request?
   * @return {Promise}
   */
  async importer(pageNum, isUpdate = false) {
    let error;
    try {
      const res = await this.query(`${this.showsURL}?page=${pageNum}`);

      await this.importerProcess(res.body, isUpdate);
    } catch (e) {
      error = e;
    }

    return error;
  }

  /**
   * Only fetch data with url.
   * @param  {String}  url - URL of the content to download.
   * @return {Promise}
   */
  async query(url) {
    await this.timer.check();

    const res = await got(url, {
      json: true,
    });

    return res;
  }

  /**
   * The result `Show` is saved to a database in a structured object
   * @param  {Number}  showId - A simple `Show` ID is stored by TVmaze
   * @param  {Object}  show   - The structural object of `Show`
   * @return {Promise}
   */
  async storeShow(showId, show) {
    try {
      await this.Shows.findOneAndUpdate({
        id: showId,
      }, show, {
        upsert: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * The result `Episode` is saved to a database in a structured object
   * @param  {Number}  showId - A simple `Show` ID is stored by TVmaze
   * @param  {Object}  episodes - The structural object of `Show`
   * @return {Promise}
   */
  async storeEpisodes(showId, episodes) {
    const show = {};

    show.id = showId - 0;
    show.episodes = episodes;

    try {
      await this.Episodes.findOneAndUpdate({
        id: show.id,
      }, show, {
        upsert: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * The procedure will help you store all information from TVmaze for an
   *  empty or incomplete database.
   *
   * If we think we already have all the data, then we only use the
   * `Tvmaze.update` method. (Faster and cost-effective.)
   * @param  {Array}  shows - More structural objects of `Show`
   * @param  {Bollean}  checkUpdate - Checks for the latest version if yes
   *                                  continue
   * @return {Promise}
   */
  async importerProcess(shows, checkUpdate) {
    for (var i = 0; i < shows.length; i++) {
      const show = shows[i];

      if (checkUpdate) {
        const currentShow = await this.Shows.findOne({ id: show.id }).select({
          'updated': 1,
          '_id': 0,
        }).exec();

        if (currentShow.updated && currentShow.updated >= show.updated) {
          continue;
        }
      }

      await this.storeShow(show.id, show);

      const episodesUrl = `${this.showsURL}/${show.id}/episodes`;
      const episodesQuery = await this.query(episodesUrl);

      await this.storeEpisodes(show.id, episodesQuery.body);
    }
  }
};
