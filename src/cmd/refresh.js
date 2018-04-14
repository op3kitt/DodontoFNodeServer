
module.exports = (req, res, msg) => {
  global.logger.debug('refresh start');
  let result = {};
  if(global.stateHolder.roomData[msg.room]){
    room = global.stateHolder.roomData[msg.room].data;
    
    if(msg.params.rIndex == 0){
      result.isFirstChatRefresh = true;
      
      result = Object.assign(result, room);
    }else{
    
    }
  }
  
  global.logger.debug('refresh end:', result);
  res.end(JSON.stringify(result));

}