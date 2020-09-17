//////////////////////////////////////
//                                  //
//        URL shortening app        //
//        Management service        //
//            Entry Point           //
//                                  //
//////////////////////////////////////

// TODO: Create all routes and their functionality
// FIXME: Change from static to dynamic URL shortening, use url module
// FIXME: Change SQL error response to server errors

/**
 * loading dependencies
 */
const express = require('express');
const cors = require('cors');

/**
 * Load secret variables
 */
const { port } = require('../config');

/**
 * Initialize express
 */
const app = express();

/**
 * Initialize middleware
 */
app.use(express.json({ limit: '500kb' }));
app.use(cors());

/**
 * Load routes
 */
const create = require('./routes/create');
const del = require('./routes/delete');

/**
 * Use routes
 */
app.use('/api/create', create);
app.use('/api/del', del);

// Create http server
app.listen(port, () => {
  console.log(`Listening @${port}`);
});
