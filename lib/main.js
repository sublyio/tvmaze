const TvmazeAdapter = require('./adapter');

/**
 * Tvmaze class
 */
module.exports = class Tvmaze {
  /**
   * Creates a instance of Tvmaze.
   * @param {Object} db - Mongoose database
   * @param {Object} opt - Options
   * @return {Void}
   */
  constructor(db = global.db, opt) {
    this.apiURL = 'https://api.tvmaze.com';
    this.showsURL = `${this.apiURL}/shows`;
    this.updateURL = `${this.apiURL}/updates/shows`;

    this.opt = Object.assign({
      checkCahe: true,
      silent: true,
    }, opt);

    this.adapter = new TvmazeAdapter(db, this.opt);
  }

  /**
   * Save the granted `show`.
   * @param  {Number|String}  showId - A simple `Show` ID is stored by TVmaze
   * @return {Promise}
   */
  async saveShow(showId) {
    if (!this.opt.silent) {
      console.log('Start getShow:', showId);
    }

    const show = await this.adapter.query(`${this.showsURL}/${showId}`);

    await this.adapter.storeShow(showId, show.body);

    return true;
  }

  /**
   * Save the granted `episodes`.
   * @param  {Number|String}  showId - A simple `Show` ID is stored by TVmaze
   * @return {Promise}
   */
  async saveEpisodes(showId) {
    const episodes = await this.adapter.query(`${this.showsURL}/${showId}/episodes`);

    await this.adapter.storeEpisodes(showId, episodes.body);

    return true;
  }

  /**
   * It polls everything from the Tvmaze servers
   * @param  {Number|String}  maxPage - Maximum page number
   * @return {Promise}
   */
  async migration(maxPage) {
    return this.adapter.importers(maxPage);
  }

  /**
   * Saves the data for the specified shows. There are usually 250 series on
   * one page and in general ~251 request.
   * @param  {Number|String}  pageNum - Concrete page number
   * @return {Promise}
   */
  async import(pageNum) {
    return this.adapter.importer(pageNum);
  }

  /**
   * Refresh already database by last update date.
   */
  update() {
    return 'No Implemented';
  }
};
