var logger = require('../../src/logger');
const log4js = require('log4js');
log4js.configure({
    appenders: {
      all: { type: 'file', filename: 'logs/test.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
    },
    categories: { default: { appenders: ['all'], level: 'debug' } }
  });
logger = log4js.getLogger('all');
module.exports.logger;