import dotenv from 'dotenv'
import database from './database'
import Tvmaze from '../lib/Tvmaze'

dotenv.config({
  path: '../.env'
})

database(async (db) => {
  const tvmaze = new Tvmaze(db, {
    silent: false,
  })

  // Save all-in
  await tvmaze.update()

  console.log('Update method complete')

  // Close database connection (optional)
  db.base.disconnect()
})

/**
* For [DEP0018] DeprecationWarning
*/
process.on('unhandledRejection', (error) => {
  console.log(error.message)
})
