const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('refresh start');
  let result = {};
  if(stateHolder.roomData[msg.room]){
    room = stateHolder.roomData[msg.room].data;
    logger.debug(room);
    
    for(item in msg.params.times){
      switch(item){
        case "chatMessageDataLog":
          if(msg.params.times[item] == 0){
            result.isFirstChatRefresh = true;
          }
          result[item] = room.chat.filter((v)=>{return v[0] > msg.params.times[item];});
        break;
        case "record":
          if(msg.params.times[item] > 0){
            result[item] = room.record.filter((v)=>{return v[0] > msg.params.times[item];});
          }
        break;
        case "characters":
          if(msg.params.times[item] == 0){
            result[item] = room[item]; 
          }
        break;
        case "map":
        case "effects":
        case "time":
        case "playRoomInfo":
          if(room.lastUpdateTimes[item] > msg.params.times[item]){
            result[item] = room[item];
          }
      }
    }
  }
  
  logger.debug('refresh end:', result);
  res.end(JSON.stringify(result));

}