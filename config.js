/**
 * Secret variables for application
 * if necessary transcrypt the file
 */
const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',

  // Port number
  port: process.env.PORT || '5000',

  // Rabbit port
  rabbitUrl: process.env.RABBIT_URL || 'localhost',

  // Base url
  baseURL: 'localhost:5005',

  // DB url
  dbUrl: process.env.MYSQL_URL || 'remotemysql.com',

  // DB username
  dbUsername: 'qJkXGOrBPl',

  // DB name
  dbName: 'qJkXGOrBPl',

  // DB pass
  dbPass: '45QgPdf7NP',
};

module.exports = config;
