const logger = require('../logger');

module.exports = (req, res, msg) => {
  logger.debug('getImageTagsAndImageList start');

  let result = {
    imageDir: "",
    imageList: [],
    tagInfos: {}
  };

  res.end(JSON.stringify(result));

  logger.debug('getImageTagsAndImageList end:', result);
}