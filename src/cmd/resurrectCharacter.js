const logger = require('../logger');

module.exports = (req, res, msg) => {
  logger.debug('resurrectCharacter start');


    if(stateHolder.roomData[msg.room]){
      let room = stateHolder.roomData[msg.room].data;
      let character = room.graveyard.find((item) => {return item.imgId == msg.params.imgId});
      if(character){
        room.characters.push(character);

        room.graveyard = room.graveyard.filter((item) => {return item.imgId != msg.params.imgId});
      }
    }

  let result = [null];

  logger.debug('resurrectCharacter end:', result);

  res.end(JSON.stringify(result));
}
