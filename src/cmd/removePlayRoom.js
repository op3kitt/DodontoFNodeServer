const logger = require('../logger');
const stateHolder = require('../stateHolder');
const playRoom = require('../class_PlayRoom');

module.exports = (req, res, msg) => {
  logger.debug('removePlayRoom start');

  let deletedRoomNumbers = [];
  let errorMessages = [];
  let passwordRoomNumbers = [];
  let askDeleteRoomNumbers = [];

  for(num of msg.params.roomNumbers){
    if(stateHolder.roomData[num]){
      let resultText = playRoom.remove(num, msg.params.ignoreLoginUser, msg.params.isForce ? null : msg.params.password, msg.params.isForce)
      switch (resultText) {
        case "OK":
          deletedRoomNumbers.push(num);
          break;
        case "password":
          passwordRoomNumbers.push(num);
          break;
        case "userExists":
          askDeleteRoomNumbers.push(num);
          break;
        default:
          errorMessages.push(resultText);
      }
    }
  }

  let result = {
    deletedRoomNumbers: deletedRoomNumbers,
    askDeleteRoomNumbers: askDeleteRoomNumbers,
    passwordRoomNumbers: passwordRoomNumbers,
    errorMessages: errorMessages
  };

  logger.debug('removePlayRoom end:', result);

  res.end(JSON.stringify(result));
}
