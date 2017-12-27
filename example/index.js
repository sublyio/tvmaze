require('dotenv').config();

const connectedDb = require('./database').connected;
const Tvmaze = require('../lib/main');

connectedDb(async (db) => {
  const tvmaze = new Tvmaze(db, {
    silent: false,
  });

  // Save show number 250
  await tvmaze.saveShow(250);

  // Save show number 250 episodes
  await tvmaze.saveEpisodes(250);

  // Save everything on site: /shows?page=137
  await tvmaze.import(137);

  // Save all-in
  await tvmaze.migration();

  console.log('Migration complete');

  // Close database connection (optional)
  db.base.disconnect();
});

/**
* For [DEP0018] DeprecationWarning
*/
process.on('unhandledRejection', (error) => {
  console.log(error.message);
});
