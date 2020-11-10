//////////////////////////////////////
//                                  //
//        URL shortening app        //
//        Management service        //
//            Entry Point           //
//                                  //
//////////////////////////////////////

// TODO:
// FIXME: Check if any variables are allocated to req / change them to res.locals
// FIXME: Escape promise hell / translate to async/await where needed

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

// Create and start connection to RabbitMQ
(async () => {
  const ch = createRabbitConn()
    .then((ch) => {
      app.set('ch', ch);
    })
    .catch((err) => {
      console.log(err);
    });
})();

/**
 * Initialize first data transfer
 */
getUrls(app.get('ch'));

/**
 * Load routes and use them
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
