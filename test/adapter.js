const expect = require('chai').expect;
const TvmazeAdapter = require('../lib/adapter');
const adapter = new TvmazeAdapter();

describe('TVmaze Adapter', () => {
  before(() => {

  });

  describe('Communication test', () => {
    it('it should be TVmaze query response status 200 and type JSON', async () => {
      const res = await adapter.query(`${adapter.showsURL}?page=1`);

      expect(res.statusCode).to.equal(200);
      expect(res.headers['content-type']).to.match(/application\/json/);
    });
  });

});
