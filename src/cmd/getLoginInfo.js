const randomstring = require('randomstring');

module.exports = (req, res, msg) => {
  global.logger.debug('getLoginInfo begin');

  uniqueId = msg.params.uniqueId;
  uniqueId || (uniqueId = createUniqueId());

  result = {
    uniqueId: uniqueId
  };
  res.end(JSON.stringify(result));

  global.logger.debug("getLoginInfo end:", result)
};

function createUniqueId(){
  return randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowervase'
  });
}