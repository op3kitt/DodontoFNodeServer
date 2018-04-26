const logger = require('../logger');
const http = require('http');
const config = require('../config');

module.exports = (req, res, msg) => {
  logger.debug('getDiceBotInfos start');

  let URL = `${config.bcdiceUrl}DodontoF/getDiceBotInfos`;
console.log(URL);
  http.get(URL, (res2) => {

    let body = '';
    res2.setEncoding('utf8');

    res2.on('data', (chunk) => {
        body += chunk;
    });

    res2.on('end', (res3) => {
        res.end(body);
    });
  }).on('error', (e) => {
    console.log(e.message); //ƒGƒ‰[Žž
  }).on('close', (e) => {
    logger.debug('getDiceBotInfos end');
  });

}