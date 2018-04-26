const logger = require('../logger');
const http = require('http');
const config = require('../config');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('sendDiceBotChatMessage start');
  if(stateHolder.roomData[msg.room]){
    let room = stateHolder.roomData[msg.room].data;

    if(isFinite(msg.params.channel) && isFinite(msg.params.repeatCount) && msg.params.name && msg.params.message && msg.params.color && msg.params.gameType){
      let repeat = parseInt(msg.params.repeatCount);
      if(repeat < 1){
        repeat = 1;
      }

      for(let i = 0;i < repeat;i++){
        let URL = `${config.bcdiceUrl}DodontoF/sendDiceBotChatMessage?system=${msg.params.gameType}&command=${msg.params.message}`;
        http.get(URL, (res2) => {

          let body = '';
          res2.setEncoding('utf8');

          res2.on('data', (chunk) => {
              body += chunk;
          });

          res2.on('end', (res3) => {
            let data = JSON.parse(body);
            room.chatMessageDataLog.push([
              new Date().getTime(),
              {
                uniqueId: msg.params.uniqueId,
                channel: msg.params.channel,
                senderName: msg.params.name,
                message: `###CutInCommand:rollVisualDice###{"chatMessage":"${msg.params.message}\\n${data.result}","randResults":${JSON.stringify(data.dices.map((item) => {return [item.value,item.faces]}))},"uniqueId":"${msg.params.uniqueId}","power":0}`.replace("\t",'\\t'),
                color: msg.params.color,
                isServerSide: true
              }
            ]);
          });
        }).on('error', (e) => {
          logger.debug(e.message); //ƒGƒ‰[
        });
      }
    }
  }

  let result = [];

  res.end(JSON.stringify(result));

  logger.debug('sendDiceBotChatMessage end');
}