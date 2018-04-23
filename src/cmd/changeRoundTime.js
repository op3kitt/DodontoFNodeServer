const logger = require('../logger');
const statHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('changeRoundtime start');

  if(stateHolder.roomData[msg.room]){
    var room = stateHolder.roomData[msg.room].data;

    if(isFinite(msg.params.round) && isFinite(msg.params.initiative) && Array.isArray(msg.params.counterNames)){
      room.roundTimeData = msg.params;
      room.lastUpdateTimes.time = new Date().getTime();
    }
  }
  let result = [null];

  res.end(JSON.stringify(result));

  logger.debug('changeRoundtime end:', result);
}