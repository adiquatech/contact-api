require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) return callback(null, _db);

  const options = {
    tls: true,
    tlsAllowInvalidCertificates: true,
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  };

  MongoClient.connect(process.env.MONGODB_URI, options)
    .then((client) => {
      _db = client.db('contacts');
      callback(null, _db);
    })
    .catch((err) => {
      console.log('MongoDB skipped (fast):', err.message);
      callback(err);
    });
};

const getDb = () => _db;

module.exports = { initDb, getDb };
