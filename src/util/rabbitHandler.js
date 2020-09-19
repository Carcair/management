/**
 * Publisher
 */
const rabbitHandler = {
  /**
   * Sending payload on project start
   */
  sendFirstPayload: (conn, payload) => {
    // On app start we send all existing DB data to consumer/redirection service

    // Open channel
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      // Assert queue
      channel.assertQueue('firstPayload');

      // Send data sa buffer to queue
      channel.sendToQueue('firstPayload', Buffer.from(JSON.stringify(payload)));
    });
  },

  /**
   * Send payload on inserting new URL values in DB
   */
  sendPayload: (conn, payload) => {
    // Open channel
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      // Assert queue
      channel.assertQueue('newUrl');

      // Send payload
      channel.sendToQueue('newUrl', Buffer.from(JSON.stringify(payload)));
    });
  },

  /**
   * Send URL inf on its deletion from DB
   */
  delPayload: (conn, payload) => {
    // Open channel
    conn.createChannel((err, channel) => {
      if (err != null) throw err;

      // Assert queue
      channel.assertQueue('delUrl');

      // Send payload to queue
      channel.sendToQueue('delUrl', Buffer.from(JSON.stringify(payload)));
    });
  },
};

module.exports = rabbitHandler;
