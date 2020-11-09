/**
 * Load modules
 */
const amqp = require('amqplib/callback_api');

const { rabbitUrl } = require('../../config');

exports.createRabbitConn = () => {
  return new Promise((resolve, reject) => {
    // Start connection to RabbitMQ service
    amqp.connect(rabbitUrl, (err, conn) => {
      if (err != null) reject(err);

      conn.createChannel((err, channel) => {
        if (err != null) reject(err);

        // Return channel obj after creation
        resolve(channel);
      });
    });
  });
};
