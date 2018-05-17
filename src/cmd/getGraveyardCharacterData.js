const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('getGraveyardCharacterData start');

  let result = [];

  if(stateHolder.roomData[msg.room]){
    var room = stateHolder.roomData[msg.room].data;

    result = room.graveyard;
  }

  logger.debug('getGraveyardCharacterData end:', result);

  res.end(JSON.stringify(result));
}
