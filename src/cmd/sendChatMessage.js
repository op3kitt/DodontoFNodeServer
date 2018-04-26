const logger = require('../logger');
const stateHolder = require('../stateHolder');
const sender = require('../messageSender');

module.exports = (req, res, msg) => {
  logger.debug('sendChatMessage start');

  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;

    if(isFinite(msg.params.channel) && msg.params.senderName && msg.params.message && msg.params.color){
      if(msg.params.dummy){
        msg.params.uniqueId = "dummy";
      }

      let data = [
        new Date().getTime(),
        {
          uniqueId: msg.params.uniqueId,
          channel: msg.params.channel,
          senderName: msg.params.senderName,
          message: msg.params.message,
          color: msg.params.color
        }
      ];
      sender(msg.room, {chatMessageDataLog: [data]});
      room.chatMessageDataLog.push(data);
    }
  }

  let result = [null];

  res.end(JSON.stringify(result));

  logger.debug('sendChatMessage end:', result);
}