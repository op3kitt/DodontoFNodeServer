const logger = require('../logger');
const stateHolder = require('../stateHolder');
const sender = require('../messageSender');

module.exports = (req, res, msg) => {
  logger.debug('changeCharacter start');

  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;
    let character = room.characters.find((item) => {return item.imgId == msg.params.imgId});
    if(character){
      Object.assign(character, msg.params);
      let data = [
        room.record.slice(-1).pop()[0]+1,
        "changeCharacter",
        [character],
        msg.own
      ];
      
      sender(msg.room, {record: [data]});
      room.record.push(data);
    }
  }

  let result = [null];

  logger.debug('changeCharacter end:', result);

  res.end(JSON.stringify(result));

}