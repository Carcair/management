const Sequelize = require('sequelize');
const db = require('../../config/dbConfig');

/**
 * Reports model
 */
const Url = db.define(
  'url',
  {
    realURL: { type: Sequelize.TEXT },
    shortURL: { type: Sequelize.TEXT },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Url;
