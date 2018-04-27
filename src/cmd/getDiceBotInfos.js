const logger = require('../logger');
const http = require('http');
const config = require('../config');

module.exports = (req, res, msg) => {
  logger.debug('getDiceBotInfos start');

  let URL = `${config.bcdiceUrl}DodontoF/getDiceBotInfos`;
  http.get(URL, (res2) => {

    let body = '';
    res2.setEncoding('utf8');

    res2.on('data', (chunk) => {
        body += chunk;
    });

    res2.on('end', (res3) => {
        res.end(body);
    });

    res2.on('end', (e) => {
      logger.debug('getDiceBotInfos end');
    });
  }).on('error', (e) => {
      console.log(e.message); //エラー時
  });

}