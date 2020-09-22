/**
 * Load modules
 */
const RabbitHandler = require('../service/RabbitHandler');

/**
 * Load sequelize schema
 */
const Url = require('../models/sequelize/Url');

/**
 * Initialize rabbitHandler obj from its class
 */
const rabbitHandler = new RabbitHandler();

/**
 * Delete a URL by its id
 */
exports.deleteUrl = (req, res) => {
  // Seperate id from parameters
  const id = req.params.id;

  // We need whole object to send back before deleting
  // In redis in Redirection service we'll delete by shortURL instead of by id
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
          // Send data of deleted url to Redirection service
          rabbitHandler.delPayload(url);

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
