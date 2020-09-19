/**
 * Load modules
 */
const rabbit = require('amqplib/callback_api');
const rabbitConfig = require('../util/rabbitHandler');

/**
 * Load sequelize schema
 */
const Url = require('../models/sequelize/Url');

/**
 * Delete a URL by its id
 */
exports.deleteUrl = (req, res) => {
  const id = req.params.id;

  // We need whole object to send back before deleting
  Url.findOne({
    where: { id },
    raw: true,
  })
    .then((url) => {
      Url.destroy({
        where: { id },
      })
        .then((result) => {
          // If there wasn't anything to delete
          if (result == 0) res.sendStatus(204);
          // If there was a URL to delete

          rabbit.connect('amqp://localhost:5672', (err, conn) => {
            if (err != null) throw err;

            // Send data of deleted url to Redirection service
            rabbitConfig.delPayload(conn, url);
          });
          res.status(200).end('Deletion successful.');
        })
        .catch((err) => {
          res.status(503).json({ err });
        });
    })
    .catch((err) => {
      res.status(503).json({ err });
    });
};
