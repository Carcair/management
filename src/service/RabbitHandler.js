/**
 * Load modules
 */
// const rabbit = require('amqplib/callback_api');
const rabbit = require('amqplib');

const { rabbitUrl } = require('../../config');

/**
 * Publisher
 */
class RabbitHandler {
  constructor(payload, type, channel) {
    this.payload = payload;
    this.type = type;
    this.channel = channel;
  }

  /**
   * Send payload
   */
  sendPayload() {
    this.channel.assertQueue(this.type);
    this.channel.sendToQueue(
      this.type,
      Buffer.from(JSON.stringify(this.payload))
    );
  }
}

module.exports = RabbitHandler;
