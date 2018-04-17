const playRoom = require('../class_PlayRoom');
const logger = require('../logger');
const config = require('../config');
const stateHolder = require('../stateHolder');
const crypt = require('bcryptjs');

module.exports = (req, res, msg) => {
  logger.debug('createPlayRoom begin');
  let resultText = "OK"

  if(msg.params.playRoomIndex == -1){
    for(let i = 0;i <= config.saveDataMaxCount;i++){
      if(!stateHolder.roomData[i]){
        msg.params.playRoomIndex = i;
        break;
      }
    }
  }

  if(0 > msg.params.playRoomIndex || msg.params.playRoomIndex > config.saveDataMaxCount){
    resultText = "noEmptyPlayRoom";
  }else{
    try{
      if(msg.params.playRoomPassword != ""){
        msg.params.playRoomPassword = crypt.hashSync(msg.params.playRoomPassword, 10);
      }
      if(stateHolder.roomData[msg.params.playRoomIndex]){
        throw "It is not empty.";
      }
      if(config.createPlayRoomPassword && msg.params.createPassword != config.createPlayRoomPassword){
        throw "Password is required to create play room.";
      }
      stateHolder.roomData[msg.params.playRoomIndex] = new playRoom(
        msg.params.playRoomIndex,
        msg.params.playRoomName,
        msg.params.playRoomPassword,
        msg.params.gameType,
        msg.params.canVisit,
        msg.params.canUseExternalImage,
        msg.params.chatChannelNames,
        msg.params.viewStates
      );
    }catch(err){
      resultText = err;
      logger.debug(err);
    }
  }

  let result = {
    resultText: resultText,
    playRoomIndex: msg.params.playRoomIndex
  };

  res.end(JSON.stringify(result));

  logger.debug('createPlayRoom end:', result);
}
