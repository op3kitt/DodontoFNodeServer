const logger = require('../logger');
const config = require('../config');
const stateHolder = require('../stateHolder');
const randomstring = require('randomstring');

module.exports = (req, res, msg) => {
  logger.debug('addCharacter begin');
  let addFailedCharacterNames = [];

  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;

    if(msg.params.name == "" || room.characters.find((item) => {return item.name == msg.params.name;})){
      addFailedCharacterNames.push(msg.params.name);
    }else{
      msg.params.imgId = "character_" + randomstring.generate(16);
      room.characters.push(msg.params);
      room.record.push([
        room.record.length>0?room.record.slice(-1).pop()[0]+1:1,
        "addCharacter",
        [msg.params],
        msg.own
      ]);
    }
    let result = {
      addFailedCharacterNames: addFailedCharacterNames
    };

    logger.debug('addCharacter end:', result);

    res.end(JSON.stringify(result));
  }else{
    res.end("");
  }

}
