const crypt = require('bcryptjs');

module.exports = (req, res, msg) => {
  global.logger.debug('loginPassword start');

  let roomNumber = msg.params.roomNumber;


  let result = {
    resultText: '',
    visiterMode: false,
    roomNumber: roomNumber,
  };

  if(global.stateHolder.roomData[roomNumber]){
    room = global.stateHolder.roomData[roomNumber].data.playRoomInfo;
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

  global.logger.debug('loginPassword end:', result);
  res.end(JSON.stringify(result));
}
