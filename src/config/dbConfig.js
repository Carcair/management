/**
 * Load DB configuration variables
 */
const { dbName, dbUsername, dbPass, dbUrl } = require('../../config');

/**
 * Load sequelize ORM
 */
const Sequelize = require('sequelize');

/**
 * Load connection obj
 */
const db = new Sequelize(dbName, dbUsername, dbPass, {
  host: dbUrl,
  dialect: 'mysql',
  // logging: false,
  define: {
    timestamps: false,
  },
});

module.exports = db;
