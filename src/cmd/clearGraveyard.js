const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('clearGraveyard start');

  if(stateHolder.roomData[msg.room]){
    var room = stateHolder.roomData[msg.room].data;

    room.graveyard = [];
  }

  let result = [null];

  logger.debug('clearGraveyard end:', result);

  res.end(JSON.stringify(result));
}
