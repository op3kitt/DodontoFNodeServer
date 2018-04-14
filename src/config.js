try{
  var local_config = require("../config.json");
}catch(err){
  var local_config = {};
}

var config = {
  logger: {
    appenders: {
      out: { type: 'stdout' },
      all: { type: 'file', filename: 'logs/all.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
    },
    categories: { default: { appenders: ['all', 'out'], level: 'debug' } }
  },
  loginMessageFiles: ["loginMessage.html", "loginMessageBase.html"],
  loginTimeOut: 60,
  defaultUserNames: [],
  saveDataMaxCount: 10,
  unremovablePlayRoomNumbers: [0],
  isPasswordNeedFroDeletePlayRoom: true,
  createPlayRoomPassword: "",
  server: {
    secure: false,
    port: 8000
  },
  isWelcomeMessageOn: true,
  isMentenanceModeOn: false
};

module.exports = Object.assign(config, local_config);