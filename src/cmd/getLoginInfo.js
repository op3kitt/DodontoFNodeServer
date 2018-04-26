const randomstring = require('randomstring');
const fs = require('fs');
const version = require('../../package.json').version;
const logger = require('../logger');
const config = require('../config');
const stateHolder = require('../stateHolder');
const http = require('http');

module.exports = (req, res, msg) => {
  logger.debug('getLoginInfo begin');

  let URL = `${config.bcdiceUrl}DodontoF/getDiceBotInfos`;
console.log(URL);
  http.get(URL, (res2) => {
    let body = '';
    res2.setEncoding('utf8');

    res2.on('data', (chunk) => {
        body += chunk;
    });

    res2.on('end', (res3) => {
      uniqueId = msg.params.uniqueId;
      uniqueId || (uniqueId = createUniqueId());
      msg.own += "\t" + uniqueId;

      result = {
        loginMessage: getLoginMessage(),
        uniqueId: uniqueId,
        allLoginCount: getLoginCount(),
        cardInfos: null,
        isDiceBotOn: null,
        refreshTimeout: null,
        refreshInterval: 3,
        isCommet: null,
        version: version,
        playRoomMaxNumber: config.saveDataMaxCount,
        warning: null,
        playRoomGetRangeMax: 10,
        limitLoginCount: null,
        loginUserCountList: [],
        maxLoginCount: null,
        skinImage: null,
        isPaformanceMonitor: null,
        fps: null,
        loginTimeLimitSecond: null,
        removeOldPlayRoomLimitDays: null,
        canTalk: null,
        retryCountLimit: null,
        imageUploadDirInfo: null,
        mapMaxWidth: null,
        mapMaxHeigth: null,
        diceBotInfos: JSON.parse(body),
        isNeedCreatePassword: null,
        defaultUserNames: config.defaultUserNames,
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

      res.end(JSON.stringify(result));
    });
  }).on('error', (e) => {
    console.log(e.message); //ƒGƒ‰[Žž
  }).on('close', (e) => {
    logger.debug("getLoginInfo end:");
  });

};

function createUniqueId(){
  return randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowervase'
  });
}

function getLoginCount(){
  stateHolder.userList = stateHolder.userList.filter(
    item => item.lastLoginTime > new Date().getTime() - config.loginTimeOut * 1000
  );
  return stateHolder.userList.length;
}

function getLoginMessage(){
  let output = "";
  for(file of config.loginMessageFiles){
    output += fs.readFileSync(`${config.APP_PATH}/content/${file}`);
  }
  return output.replace(/"/g, "\\\"");
}