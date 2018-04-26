const logger = require('../logger');
const stateHolder = require('../stateHolder');
const sender = require('../messageSender');

module.exports = (req, res, msg) => {
  logger.debug('chatState start');

  if(user = stateHolder.userList.find((item)=>{return item.own == msg.own;})){
    user.name = msg.params.name;
    user.writingState = msg.params.writingState;
  }

  let result = {
    result: "OK"
  };
  userList = stateHolder.userList.filter((item)=>{return item.room == msg.room && item.writingState;})
  sender(msg.room, {writing: userList.map((item)=>{return item.name;})});
  res.end(JSON.stringify(result));

  logger.debug('chatState end:', result);
}