const logger = require('../logger');
const config = require('../config');
const stateHolder = require('../stateHolder');

module.exports = (req, res, msg) => {
  logger.debug('checkPlayRoomInfo start');

  let roomNumber = msg.params.roomNumber;

  if(stateHolder.roomData[roomNumber]){
    room = stateHolder.roomData[roomNumber].data.playRoomInfo;
    roomInfo = {
      canUseExternalImage: room.canUseExternalImage,
      canVisit: room.canVisit,
      chatChannelNames: room.chatChannelNames,
      isMentenanceModeOn: config.isMentenanceModeOn,
      isPasswordLocked: room.playRoomPassword==""?false:true,
      isRoomExist: true,
      isWelcomeMessageOn: config.isWelcomeMessageOn,
      roomName: room.playRoomName,
      roomNumber: roomNumber
    };
  }else{
    roomInfo = {
      canUseExternalImage: false,
      canVisit: false,
      chatChannelNames: null,
      isMentenanceModeOn: config.isMentenanceModeOn,
      isPasswordLocked: false,
      isRoomExist: false,
      isWelcomeMessageOn: config.isWelcomeMessageOn,
      roomName: "",
      roomNumber: roomNumber
    };
  }

  let result = roomInfo;

  logger.debug('checkPlayRoomInfo end:', result);
  res.end(JSON.stringify(result));
}
