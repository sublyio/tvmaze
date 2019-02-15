const mongoose = require('mongoose');

mongoose.plugin(require('mongoose-integer'));

const mongoConf = {
  keepAlive: 1,
  useNewUrlParser: true,
  authSource: process.env.MONGODB_AUTHSOURCE,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
};

if (process.env.MONGODB_AUTH_ENABLE !== 'true') {
  delete mongoConf.authSource;
  delete mongoConf.user;
  delete mongoConf.pass;
}

async function mongodb(cb) {
  mongoose.Promise = global.Promise;

  global.db = await mongoose.createConnection(process.env.MONGODB_URI, mongoConf);

  cb(global.db);
}

module.exports.connected = mongodb;
