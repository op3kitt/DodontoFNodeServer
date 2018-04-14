
module.exports = (req, res, msg) => {
  global.logger.debug('removePlayRoomStates start');

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

  global.logger.debug('removePlayRoomStates end:', result);
}