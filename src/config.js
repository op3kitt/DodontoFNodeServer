var local_config = require("../config.json");

var config = {
  logger: {
    appenders: {
      out: { type: 'stdout' },
      all: { type: 'file', filename: 'logs/all.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
    },
    categories: { default: { appenders: ['all', 'out'], level: 'debug' } }
  },

  server: {
    secure: false,
    port: 8000
  }
};

module.exports = Object.assign(config, local_config);