const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('refresh start');
  let result = {};
  if(stateHolder.roomData[msg.room]){
    room = stateHolder.roomData[msg.room].data;
    
    if(msg.params.rIndex == 0){
      result.isFirstChatRefresh = true;
      
      result = Object.apply(result, room);
    }else{
    
    }
  }
  
  logger.debug('refresh end:', result);
  res.end(JSON.stringify(result));

}