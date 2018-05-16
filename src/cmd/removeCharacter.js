const logger = require('../logger');
const stateHolder = require('../stateHolder');
const sender = require('../messageSender');

module.exports = (req, res, msg) => {
  logger.debug('removeCharacter start');

  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;
    let character = room.characters.find((item) => {return item.imgId == msg.params.imgId});
    if(character){
      if(msg.params.isGotoGraveyard){
        room.graveyard.push(character);
      }

      room.characters = room.characters.filter((item) => {return item.imgId != msg.params.imgId});
    }
  }

  let result = [null];

  logger.debug('removeCharacter end:', result);

  res.end(JSON.stringify(result));

}
