/**
 * Load modules
 */
const amqp = require('amqplib/callback_api');

const { rabbitUrl } = require('../../config');

exports.createRabbitConn = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(rabbitUrl, (err, conn) => {
      if (err != null) reject(err);

      conn.createChannel((err, channel) => {
        if (err != null) reject(err);

        resolve(channel);
      });
    });
  });
};

// exports.createRabbitConn = async () => {
//   const conn = await amqp.connect(rabbitUrl);
//   const ch = await conn.createChannel();

//   return ch;
// };
