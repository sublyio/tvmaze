import TvmazeAdapter from './adapter';

/**
 * Tvmaze class
 */
export default class Tvmaze {
  /**
   * Creates an instance of Tvmaze.
   * @param {Object} db - Mongoose database
   * @return {Void}
   */
  constructor(db = global.db) {
    this.apiURL = 'https://api.tvmaze.com';
    this.showsURL = `${this.apiURL}/shows`;
    this.updateURL = `${this.apiURL}/updates/shows`;

    this.adapter = new TvmazeAdapter(db);
  }

  /**
   * Save the granted `show`.
   * @param  {Number|String}  showId - A simple `Show` ID is stored by TVmaze
   * @return {Promise}
   */
  async saveShow(showId) {
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
   * It saves the data for the specified shows.
   * @param  {Number|String}  pageNum - Concrete page number
   * @return {Promise}
   */
  async import(pageNum) {
    return this.adapter.importer(pageNum);
  }

  /**
   * Refresh already database by last update date.
   *
   * @param  {Number|String}  maxPage - Maximum page number
   * @return {Promise}
   */
  update(maxPage) {
    return this.adapter.importers(maxPage, true);
  }
};
