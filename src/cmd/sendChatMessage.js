const logger = require('../logger');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('sendChatMessage start');

  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;

    if(isFinite(msg.params.channel) && msg.params.senderName && msg.params.message && msg.params.color){
      if(msg.params.dummy){
        msg.params.uniqueId = "dummy";
      }

      room.chatMessageDataLog.push([
        new Date().getTime(),
        {
          uniqueId: msg.params.uniqueId,
          channel: msg.params.channel,
          senderName: msg.params.senderName,
          message: msg.params.message,
          color: msg.params.color
        }
      ]);
    }
  }

  let result = [null];

  logger.debug(JSON.stringify(result));

  logger.debug('sendChatMessage end:', result);
}