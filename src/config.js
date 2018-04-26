const fs = require('fs');

module.exports = {
  logger: {
    appenders: {
      all: { type: 'file', filename: 'logs/all.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
    },
    categories: { default: { appenders: ['all'], level: 'debug' } }
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
  isMentenanceModeOn: false,
  load: (file) => {
    try{
      let stat = fs.statSync(file);
      let data = JSON.parse(fs.readFileSync(file));
      module.exports = Object.assign(config, data);
    }catch(err){

    }
  },
  bcdiceUrl: "http://127.0.0.1:8001/",
};

var config = module.exports;