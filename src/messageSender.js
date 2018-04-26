const stateHolder = require('./stateHolder');
const logger = require('./logger');

module.exports = (roomNumber, message) => {
  try{
    userList = stateHolder.userList.filter((item) => {return item.room == roomNumber && item.wsconnection && item.wsconnection.connected;});
    userList.forEach((item)=>{item.wsconnection.send && item.wsconnection.send(JSON.stringify(message))});
  }catch(e){
    logger.debug(e);
  };
};