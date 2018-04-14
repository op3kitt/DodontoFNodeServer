var dateFormat = require('dateformat');

module.exports = (req, res, msg) => {
  global.logger.debug('getPlayRoomState start');

  let min = msg.params.minRoom;
  let max = msg.params.maxRoom;

  if(min > max){min = max;}

  let roomList = [];
  for(let i = min;i <= max;i++){
    if(global.stateHolder.roomData[i]){
      room = global.stateHolder.roomData[i].data;
      roomList.push({
        canVisit: room.playRoomInfo.canVisit,
        gameType: room.playRoomInfo.gameType,
        index: `  ${i}`.substr(-3),
        lastUpdateTime: dateFormat(room.lastUpdateTime, "yyyy/mm/dd h:MM:ss"),
        loginUsers: room.login,
        passwordLockState: room.playRoomInfo.playRoomPassword != "",
        playRoomName: room.playRoomInfo.playRoomName
      });
    }else{
      roomList.push({
        canVisit: false,
        gameType: "",
        index: `  ${i}`.substr(-3),
        lastUpdateTime: "",
        loginUsers: [],
        passwordLockState: false,
        playRoomName: "（空き部屋）"
      });
    }
  }

  let result = {
    maxRoom: max,
    minRoom: min,
    playRoomStates: roomList
  };

  global.logger.debug('getPlayRoomStates end:', result);
  res.end(JSON.stringify(result));
}
