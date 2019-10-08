/* eslint-disable comma-dangle */
const Sequelize = require('sequelize');

const db = new Sequelize('automart', 'postgres', 'jesus4ever', {
  host: 'localhost',
  dialect: 'postgres',
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

db.authenticate()
  .then(() => console.log('Connected to database...'))
  .catch((err) => console.log(`Error connecting to database : ${err}`));

module.exports = db;