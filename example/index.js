import dotenv from 'dotenv'
import database from './database.js'
import Tvmaze from '../lib/Tvmaze.js'

dotenv.config({
  path: '../.env'
})

database(async (db) => {
  const tvmaze = new Tvmaze(db, {
    silent: false,
  })

  // Save show number 250
  await tvmaze.saveShow(250)

  // // Save show number 250 episodes
  // await tvmaze.saveEpisodes(250)

  // // Save everything on site: /shows?page=137
  // await tvmaze.import(137)

  // Save all-in
  // await tvmaze.migration()

  console.log('Migration complete')

  // Close database connection (optional)
  db.close()

  // process.exit()
})

/**
* For [DEP0018] DeprecationWarning
*/
process.on('unhandledRejection', (error) => {
  console.log(error.message)
})
