var config = require('../src/config');
const log4js = require('log4js');
log4js.configure(global.config.logger);

module.exports = log4js.getLogger('all');