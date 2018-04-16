const crypt = require('bcryptjs');
const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('loginPassword start');

  let roomNumber = msg.params.roomNumber;


  let result = {
    resultText: '',
    visiterMode: false,
    roomNumber: roomNumber,
  };

  if(stateHolder.roomData[roomNumber]){
    room = stateHolder.roomData[roomNumber].data.playRoomInfo;
    if(room.canVisit && msg.params.visiterMode){
      result.resultText = "OK";
      result.visiterMode = true;
    }else{
      if(room.playRoomPassword == "" || crypt.compareSync(msg.params.password, room.playRoomPassword)){
        result.resultText = "OK";
      }else{
        result.resultText = "passwordMismatch";
      }
    }
  }else{
    result.resultText = `プレイルームNo.${roomNumber}は作成されていません`;
  }

  logger.debug('loginPassword end:', result);
  res.end(JSON.stringify(result));
}
