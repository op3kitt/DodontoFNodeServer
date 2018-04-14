const playRoom = require('../class_PlayRoom');

module.exports = (req, res, msg) => {
  global.logger.debug('createPlayRoom begin');
  let resultText = "OK"

  if(msg.params.playRoomIndex == -1){
    for(let i = 0;i <= global.config.saveDataMaxCount;i++){
      if(!global.stateHolder.roomData[i]){
        msg.params.playRoomIndex = i;
        break;
      }
    }
  }

  if(0 > msg.params.playRoomIndex || msg.params.playRoomIndex > global.config.saveDataMaxCount){
    resultText = "noEmptyPlayRoom";
  }else{
    try{
      if(global.stateHolder.roomData[msg.params.playRoomIndex]){
        throw "It is not empty.";
      }
      if(global.config.createPlayRoomPassword && msg.params.createPassword != global.config.createPlayRoomPassword){
        throw "Password is required to create play room.";
      }
      global.stateHolder.roomData[msg.params.playRoomIndex] = new playRoom(
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
      global.logger.debug(err);
    }
  }

  let result = {
    resultText: resultText,
    playRoomIndex: msg.params.playRoomIndex
  };

  res.end(JSON.stringify(result));

  global.logger.debug('createPlayRoom end:', result);
}
