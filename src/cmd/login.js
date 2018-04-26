const logger = require('../logger');

module.exports = (req, res, msg) => {
  logger.debug('login start');

  let result = {
    result: "OK"
  };

  res.end(JSON.stringify(result));

  logger.debug('login end:', result);
}