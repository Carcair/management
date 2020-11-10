/**
 * Load modules and helpers
 */
const RabbitHandler = require('../service/RabbitHandler');
const { createURLObj } = require('../util/helpers');

/**
 * Load sequelize schema
 */
const Url = require('../models/sequelize/Url');

/**
 * Load secret variables
 */
const { baseURL } = require('../../config');

/**
 * Class for Create route
 */
const create = {
  /**
   * Create URL and insert it in DB
   */
  newUrl: async (req, res) => {
    // Get realURL
    const realURL = req.body.realURL;

    /**
     * TODO: Transfering to async/await to escape promise hell
     */
    (async () => {
      const urls = await Url.findAll();
      console.log(urls);
    })();

    /**
     * We need to generate shortURL that doesn't exist
     */
    Url.findAll()
      .then((urls) => {
        // Temp array with all existing shortURLs
        let tempArr = [];

        // Seperate only shortURL variables
        // We need to for comparison when generating new shortURL
        urls.forEach((element) => {
          tempArr.push(element.shortURL);
        });

        // Create object with URL variables
        const temp = createURLObj(realURL, baseURL, tempArr);

        // Will return 406 in case URLs aren't valid
        if (temp === 406) res.status(406).end('Invalid URLs.');

        // Insert into DB
        Url.create(temp)
          .then(() => {
            // Return value we inserted as response
            // So we can send it to redirection service
            Url.findOne({
              where: { realURL },
              raw: true,
            }).then((url) => {
              // Successful insert
              const rabbitHandler = new RabbitHandler(
                url,
                'newUrl',
                req.app.get('ch')
              );
              // Send url data to Redirection service
              rabbitHandler.sendPayload();

              res.status(201).json(url);
            });
          })
          .catch((err) => {
            // Failed query
            res.status(503).json({ err });
          });
      })
      .catch((err) => {
        // Failed query
        res.status(503).json({ err });
      });
  },
};

module.exports = create;
