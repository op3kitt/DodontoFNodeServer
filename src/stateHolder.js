const fs = require('fs');
const logger = require('./logger');

module.exports = {
  userList: [],
  roomData: [],
  load: (file) => {
    try{
      let stat = fs.statSync(file);
      let data = JSON.parse(fs.readFileSync(file));
      module.exports.roomData = Object.assign(stateHolder, data);
    }catch(err){
      logger.error(err);
    }
  }
};

stateHolder = module.exports;