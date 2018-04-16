const logger = require('../logger');

module.exports = (req, res, msg) => {
  logger.debug('removePlayRoomStates start');

  let deletedRoomNumbers = [];
  let errorMessages = [];
  let passwordRoomNumbers = [];
  let askDeleteRoomNumbers = [];


  let result = {
    deletedRoomNumbers: deletedRoomNumbers,
    askDeleteRoomNumbers: askDeleteRoomNumbers,
    passwordRoomNumbers: passwordRoomNumbers,
    errorMessages: errorMessages
  };

  res.end(JSON.stringify(result);

  logger.debug('removePlayRoomStates end:', result);
}