//////////////////////////////////////
//                                  //
//        URL shortening app        //
//        Management service        //
//            Entry Point           //
//                                  //
//////////////////////////////////////

// TODO:
// FIXME:

/**
 * loading dependencies
 */
const express = require('express');
const cors = require('cors');
const { getUrls } = require('./util/helpers');
const swaggerUi = require('swagger-ui-express');

/**
 * Load swagger document
 */
const swaggerDoc = require('../swagger.json');

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
 * Initialize first data transfer
 */
getUrls();

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Create http server
app.listen(port, () => {
  console.log(`Listening @${port}`);
});
