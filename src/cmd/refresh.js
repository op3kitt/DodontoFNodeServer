const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('refresh start');
  let result = {};
  if(stateHolder.roomData[msg.room]){
    room = stateHolder.roomData[msg.room].data;
    
    result.imageTags = {};
    if(room.lastUpdateTimes.playRoomInfo > msg.params.times.playRoomInfo){
      result = room.playRoomInfo;
    }

    for(item in msg.params.times){
      switch(item){
        case "chatMessageDataLog":
          if(msg.params.times[item] == 0){
            result.isFirstChatRefresh = true;
          }
          result[item] = room[item].filter((v)=>{return v[0] > msg.params.times[item];});
        break;
        case "recordIndex":
          if(msg.params.times[item] > 0){
            result.record = room.record.filter((v)=>{return v[0] > msg.params.times[item];});
          }
        break;
        case "characters":
          if(msg.params.times[item] == 0){
            result[item] = room[item];
            result.graveyard = room.graveyard;
            result.waitingRoom = room.waitingRoom;
            result.cardTrushMount = room.cardTrushMount;
            result.cardMount = room.cardMount;
            result.resource = room.resource;
            result.imageTags = {};
          }
        break;
        case "map":
          if(room.lastUpdateTimes[item] > msg.params.times[item]){
            result.mapData = room.mapData;
          }
        case "time":
          if(room.lastUpdateTimes[item] > msg.params.times[item]){
            result.roundTimeData = room.roundTimeData;
          }
        case "effects":
          if(room.lastUpdateTimes[item] > msg.params.times[item]){
            result[item] = room[item];
          }
      }
    }
    result.refreshIndex = msg.params.rIndex;
    let datenum = new Date().getTime();
    result.lastUpdateTimes = {
      effects: datenum,
      time: datenum,
      map: datenum,
      chatMessageDataLog: datenum,
      recordIndex: room.record.length,
      characters: datenum,
      playRoomInfo: datenum,
      record: datenum,
      recordIndex: room.record.length > 0?room.record.slice(-1).pop()[0]:0
    };
    result.loginUserInfo = {};
  }
  
  logger.debug('refresh end:', result);
  res.end(JSON.stringify(result));

}