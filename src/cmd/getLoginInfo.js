const randomstring = require('randomstring');
const fs = require('fs');
const version = require('../../package.json').version;

module.exports = (req, res, msg) => {
  global.logger.debug('getLoginInfo begin');

  uniqueId = msg.params.uniqueId;
  uniqueId || (uniqueId = createUniqueId());
  msg.own += "\t" + uniqueId;

  result = {
    loginMessage: getLoginMessage(),
    uniqueId: uniqueId,
    allLoginCount: getLoginCount(),
    cardInfos: null,
    //isDiceBotOn: null, => deprecated
    refreshTimeout: null,
    refreshInterval: 3,
    isCommet: null,
    version: version,
    playRoomMaxNumber: global.config.saveDataMaxCount,
    warning: null,
    playRoomGetRangeMax: 10,
    limitLoginCount: null,
    loginUserCountList: [],
    maxLoginCount: null,
    skinImage: null,
    isPaformanceMonitor: null,
    //fps: null, => deprecated
    loginTimeLimitSecond: null,
    removeOldPlayRoomLimitDays: null,
    //canTalk: null, => deprecated
    retryCountLimit: null,
    imageUploadDirInfo: null,
    mapMaxWidth: null,
    mapMaxHeigth: null,
    diceBotInfos: [],
    isNeedCreatePassword: null,
    defaultUserNames: global.config.defaultUserNames,
    drawLineCountLimit: null,
    logoutUrl: null,
    languages: null,
    canUseExternalImageModeOn: null,
    characterInfoToolTipMax: null,
    isAskRemoveRoomWhenLogout: null,
    canUploadImageOnPublic: null,
    wordChecker: null,
    errorMessage: null
  };

  global.logger.debug("getLoginInfo end:", result)
  res.end(JSON.stringify(result));
};

function createUniqueId(){
  return randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowervase'
  });
}

function getLoginCount(){
  global.stateHolder.userList = global.stateHolder.userList.filter(
    item => item.lastLoginTime > new Date().getTime() - global.config.loginTimeOut * 1000
  );
  return global.stateHolder.userList.length;
}

function getLoginMessage(){
  if(!global.LoginMessage){
    let output = "";
    for(file of global.config.loginMessageFiles){
      output += fs.readFileSync(`${global.APP_PATH}/content/${file}`);
    }
    global.LoginMessage = output;
  }
  return global.LoginMessage.replace(/"/g, "\\\"");
}