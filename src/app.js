//////////////////////////////////////
//                                  //
//        URL shortening app        //
//        Management service        //
//            Entry Point           //
//                                  //
//////////////////////////////////////

// TODO:
// FIXME: Remove redundant comments
// FIXME: Pull rabbit queue connection outside of queries / Once is enough
// FIXME: Edit to make publisher functions reusable
// FIXME: Send type of message inside of payload / Consumer will differentiate and act accordingly
// FIXME: Check if any variables are allocated to req / change them to res.locals
// FIXME: Fix file structure / differentiate middlewares and controllers
// FIXME: Escape promise hell / translate to async/await

/**
 * loading dependencies, helpers and files
 */
const express = require('express');
const cors = require('cors');
const { createRabbitConn } = require('./config/rabbitConnection');
const { getUrls } = require('./util/helpers');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

/**
 * Load secret variables
 */
const { port } = require('../config');

/**
 * Create express instance and initialize body parser and cors MWs
 */
const app = express();
app.use(express.json({ limit: '500kb' }));
app.use(cors());

/**
 * Create connection to RabbitMQ and a channel
 */
// const ch = createRabbitConn();
app.set('ch', createRabbitConn());

// /**
//  * Initialize first data transfer
//  */
getUrls();

/**
 * Load routes and use
 */
const create = require('./routes/create');
const del = require('./routes/delete');

app.use('/api/create', create);
app.use('/api/del', del);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Create http server
app.listen(port, () => {
  console.log(`Listening @${port}`);
});
