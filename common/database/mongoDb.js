const mongoose = require('mongoose');

const { connectionString } = process.env;

global.cachedDb;

mongoose.Promise = global.Promise;

exports.connectToDatabase = async () => new Promise((resolve, reject) => {
  mongoose.connection
    .on('error', (error) => {
      console.log('Error: connection to DB failed');
      reject(error);
    })
    .on('close', () => {
      console.log('Error: Connection to DB lost');
      process.exit(1);
    })
    .once('open', () => {
      // const infos = mongoose.connections;

      // infos.map((info) => console.log(`Connected to ${info.host}:${info.port}/${info.name}`));
      resolve(global.cachedDb);
    });

  if (!global.cachedDb) {
    global.cachedDb = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      connectTimeoutMS: 10000,
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
    });
  } else {
    // console.log('MongoDB: using cached database instance');
    resolve(global.cachedDb);
  }
});
