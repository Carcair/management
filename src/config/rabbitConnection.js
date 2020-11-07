/**
 * Load modules
 */
const amqp = require('amqplib');

const { rabbitUrl } = require('../../config');

exports.createRabbitConn = async () => {
  const conn = await amqp.connect(rabbitUrl);
  return await conn.createChannel();

  // return ch;
};
