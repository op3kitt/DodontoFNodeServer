class PlayRoom{
  constructor(roomNumber, playRoomName, playRoomPassword, gameType, canVisit, canUseExternalImage, chatChannelNames, viewStates){
    this.roomNumber = roomNumber;
    this.data = {
      login: [],
      chat: [],
      playRoomInfo: {
        playRoomName: playRoomName,
        playRoomPassword: playRoomPassword,
        chatChannelNames: chatChannelNames,
        canUseExternalImage: canUseExternalImage,
        canVisit: canVisit,
        gameType: gameType,
        viewStateInfo: {
          isPositionVisible: true,
          isInitiativeListVisible: true,
          isGridVisible: true,
          isRotateMarkerVisible: true,
          isCardPickUpVisible: false,
          isAdjustImageSize: true,
          isSnapMovablePiece: true,
          isCutInVisible: true,
          isDiceVisible: true,
          isChatPaletteVisible: false,
          isResourceWindowVisible: false,
          isChatVisible: true,
          isCardHandleLogVisible: true,
          isStandingGraphicVisible: true,
          isCounterRemoconVisible: false,
          key: ""
        },
        backgroundImage: null
      },
      lastUpdatedTime: new Date()
    };
    this.data.playRoomInfo.viewStateInfo = Object.assign(this.data.playRoomInfo.viewStateInfo, viewStates);
  };

  /*remove(ignoreLoginUser, password, isForce){

    if(global.config.unremovablePlayRoomNumbers.includes(this.roomNumber)){
      return "unremovablePlayRoomNumber";
    }

    if(!ignoreLoginUser){
      this.data.login = this.data.login.filter(
        item => item.timeSeconds > new Date().getTime() - global.config.loginTimeOut * 1000
      );
      if(this.data.login.length > 0){
        return "userExist"
      }
    }

    if(this.playRoomInfo.playRoomPassword && global.config.isPasswordNeedFroDeletePlayRoom){

    }

    return "OK"
  }*/
}

module.exports = PlayRoom;