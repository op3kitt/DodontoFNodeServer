const logger = require('../logger');
const stateHolder = require('../stateHolder');
const fs = require('fs');
const randomstring = require('randomstring');
const config = require('../config');

module.exports = (req, res, msg) => {
  logger.debug('uploadImageData start');

  let ext = msg.params.imageFileName.split('.').pop();
  let name = randomstring.generate({
    length: 16,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });
  if(isFinite(msg.params.roomNumber)){
    if(!fs.existsSync(`${config.imageUploadSpace}/room_${msg.params.roomNumber}`)){
      fs.mkdirSync(`${config.imageUploadSpace}/room_${msg.params.roomNumber}`, 777);
    }
    fs.writeFileSync(`${config.imageUploadSpace}/room_${msg.params.roomNumber}/${name}.${ext}`, msg.params.imageData);
    fs.writeFileSync(`${config.imageUploadSpace}/room_${msg.params.roomNumber}/small_${name}.${ext}`, msg.params.smallImageData);
  }else{
    if(!fs.existsSync(`${config.imageUploadSpace}/public`)){
      fs.mkdirSync(`${config.imageUploadSpace}/public`, 777);
    }
    fs.writeFileSync(`${config.imageUploadSpace}/public/${name}.${ext}`, msg.params.imageData);
    fs.writeFileSync(`${config.imageUploadSpace}/public/small_${name}.${ext}`, msg.params.smallImageData);
  }

  let result = {
    resultText: "OK"
  };

  res.end(JSON.stringify(result));

  logger.debug('uploadImageData end:', result);
}