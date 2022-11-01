import { plugin, createConnection } from 'mongoose'
import mongooseInteger from 'mongoose-integer'

plugin(mongooseInteger)

const mongoConf = {
  keepAlive: true,
  useNewUrlParser: true,
  authSource: process.env.MONGODB_AUTHSOURCE,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
}

if (process.env.MONGODB_AUTH_ENABLE !== 'true') {
  delete mongoConf.authSource
  delete mongoConf.user
  delete mongoConf.pass
}

const database = function(cb) {
  global.db = createConnection(process.env.MONGODB_URI, mongoConf)

  cb(global.db)
}

export default database
