const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('moveCharacter start');

  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;
    let character = room.characters.find((item) => {return item.imgId == msg.params.imgId});
    if(character && isFinite(msg.params.x) && isFinite(msg.params.y)){
      character.x = parseFloat(msg.params.x);
      character.y = parseFloat(msg.params.y);
      room.record.push([
        room.record.slice(-1).pop()[0]+1,
        "changeCharacter",
        [character],
        msg.own
      ]);
    }
  }

  let result = [null];

  logger.debug('moveCharacter end:', result);

  res.end(JSON.stringify(result));

}