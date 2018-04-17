const config = require('./config');

class PlayRoom{
  constructor(roomNumber, playRoomName, playRoomPassword, gameType, canVisit, canUseExternalImage, chatChannelNames, viewStates){
    this.roomNumber = roomNumber;
    this.data = {
      login: {},
      chatMessageDataLog: [],
      roundTimeData: {
        initiative: 0.0,
        round: 1.0,
        counterNames: ["HP", "*“]“|"]
      },
      resource: [],
      characters: [],
      graveyard: [],
      waitingRoom: [],
      cardTrushMount: {},
      cardMount: {},
      mapData: {
        mapType: "imageGraphic",
        imageSource: "image/whiteBack.png",
        mirrored: false,
        xMax: 20,
        yMax: 20,
        mapMarks: [],
        mapMarksAlpha: 1.0,
        isAlternately: false,
        gridColor: 0,
        draws: [],
        gridInterval: 1
      },
      record: [],
      effects: [],
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
      lastUpdateTimes: {
        map: new Date().getTime(),
        effects: new Date().getTime(),
        time: new Date().getTime(),
        playRoomInfo: new Date().getTime()
      }
    };
    this.data.playRoomInfo.viewStateInfo = Object.assign(this.data.playRoomInfo.viewStateInfo, viewStates);
  };

  /*remove(ignoreLoginUser, password, isForce){

    if(config.unremovablePlayRoomNumbers.includes(this.roomNumber)){
      return "unremovablePlayRoomNumber";
    }

    if(!ignoreLoginUser){
      this.data.login = this.data.login.filter(
        item => item.timeSeconds > new Date().getTime() - config.loginTimeOut * 1000
      );
      if(this.data.login.length > 0){
        return "userExist"
      }
    }

    if(this.playRoomInfo.playRoomPassword && config.isPasswordNeedFroDeletePlayRoom){

    }

    return "OK"
  }*/
}

module.exports = PlayRoom;