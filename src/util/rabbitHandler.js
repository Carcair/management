/**
 * Publisher
 */
const rabbitConfig = {
  /**
   * Sending payload on project start
   */
  sendFirstPayload: (conn, payload) => {
    // On app start we send all existing DB data to consumer/redirection service
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      channel.assertQueue('firstPayload');
      channel.sendToQueue('firstPayload', Buffer.from(JSON.stringify(payload)));
    });
  },

  /**
   * Send payload on inserting new URL values in DB
   */
  sendPayload: (conn, payload) => {
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      channel.assertQueue('newUrl');
      channel.sendToQueue('newUrl', Buffer.from(JSON.stringify(payload)));
    });
  },

  /**
   * Send URL inf on its deletion from DB
   */
  delPayload: (conn, payload) => {
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      channel.assertQueue('delUrl');
      channel.sendToQueue('delUrl', Buffer.from(payload));
    });
  },

  /**
   * We expect from redirection service data about his full host and protocol values
   * done on project initialization so we can create correct shortUrl
   */
  getUrl: (conn) => {
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      channel.assertQueue('baseUrl');
      channel.consume('baseUrl', (payload) => {
        if (payload !== null) {
          console.log(payload.content.toString());
          channel.ack(payload);
        }
      });
    });
  },
};

module.exports = rabbitConfig;
