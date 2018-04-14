module.exports = (req, res, msg) => {
  global.logger.debug('checkPlayRoomInfo start');

  let roomNumber = msg.params.roomNumber;

  if(global.stateHolder.roomData[roomNumber]){
    room = global.stateHolder.roomData[roomNumber].data.playRoomInfo;
    roomInfo = {
      canUseExternalImage: room.canUseExternalImage,
      canVisit: room.canVisit,
      chatChannelNames: room.chatChannelNames,
      isMentenanceModeOn: global.config.isMentenanceModeOn,
      isPasswordLocked: room.playRoomPassword==""?false:true,
      isRoomExist: true,
      isWelcomeMessageOn: global.config.isWelcomeMessageOn,
      roomName: room.playRoomName,
      roomNumber: roomNumber
    };
  }else{
    roomInfo = {
      canUseExternalImage: false,
      canVisit: false,
      chatChannelNames: null,
      isMentenanceModeOn: global.config.isMentenanceModeOn,
      isPasswordLocked: false,
      isRoomExist: false,
      isWelcomeMessageOn: global.config.isWelcomeMessageOn,
      roomName: "",
      roomNumber: roomNumber
    };
  }

  let result = roomInfo;

  global.logger.debug('checkPlayRoomInfo end:', result);
  res.end(JSON.stringify(result));
}
