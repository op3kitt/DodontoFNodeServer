const assert = require('assert');
const http = require('http');
const nock = require('nock');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const requireNew = require('require-new');
const path = require('path');
const config = require('./module/config.js');
config.APP_PATH = path.resolve(__dirname+'/..');
const stateHolder = require('../src/stateHolder');
var logger = require('./module/logger');

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#getLoginInfos()', function() {
    it('first request to connect server', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'POST',
        url: '/DodontoFServer',
        headers: {
          "Content-Type": "application/x-msgpack"
        }
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

    	res.end = (data) => {
        data = JSON.parse(data);
        assert.equal(data.hasOwnProperty('cardInfos'), true);
        assert.equal(data.hasOwnProperty('isDiceBotOn'), true);
        assert.notEqual(data.uniqueId, null);
        assert.equal(data.hasOwnProperty('loginMessage'), true);
        assert.equal(data.hasOwnProperty('refreshTimeout'), true);
        assert.equal(data.hasOwnProperty('refreshInterval'), true);
        assert.equal(data.hasOwnProperty('isCommet'), true);
        assert.equal(data.hasOwnProperty('version'), true);
        assert.equal(data.hasOwnProperty('playRoomMaxNumber'), true);
        assert.equal(data.hasOwnProperty('warning'), true);
        assert.equal(data.hasOwnProperty('playRoomGetRangeMax'), true);
        assert.equal(data.hasOwnProperty('allLoginCount'), true);
        assert.equal(data.hasOwnProperty('limitLoginCount'), true);
        assert.equal(data.hasOwnProperty('loginUserCountList'), true);
        assert.equal(data.hasOwnProperty('maxLoginCount'), true);
        assert.equal(data.hasOwnProperty('skinImage'), true);
        assert.equal(data.hasOwnProperty('isPaformanceMonitor'), true);
        assert.equal(data.hasOwnProperty('fps'), true);
        assert.equal(data.hasOwnProperty('loginTimeLimitSecond'), true);
        assert.equal(data.hasOwnProperty('removeOldPlayRoomLimitDays'), true);
        assert.equal(data.hasOwnProperty('canTalk'), true);
        assert.equal(data.hasOwnProperty('retryCountLimit'), true);
        assert.equal(data.hasOwnProperty('imageUploadDirInfo'), true);
        assert.equal(data.hasOwnProperty('mapMaxWidth'), true);
        assert.equal(data.hasOwnProperty('mapMaxHeigth'), true);
        assert.equal(data.hasOwnProperty('diceBotInfos'), true);
        assert.equal(data.hasOwnProperty('isNeedCreatePassword'), true);
        assert.equal(data.hasOwnProperty('defaultUserNames'), true);
        assert.equal(data.hasOwnProperty('drawLineCountLimit'), true);
        assert.equal(data.hasOwnProperty('logoutUrl'), true);
        assert.equal(data.hasOwnProperty('languages'), true);
        assert.equal(data.hasOwnProperty('canUseExternalImageModeOn'), true);
        assert.equal(data.hasOwnProperty('characterInfoToolTipMax'), true);
        assert.equal(data.hasOwnProperty('isAskRemoveRoomWhenLogout'), true);
        assert.equal(data.hasOwnProperty('canUploadImageOnPublic'), true);
        assert.equal(data.hasOwnProperty('wordChecker'), true);
        assert.equal(data.hasOwnProperty('errorMessage'), true);
      };
      nock('http://nock')
       .get(/.*/)
       .reply(200, []);
      req.write(msgpack.encode({
        cmd: "getLoginInfo",
        room: -1,
        params: {
          uniqueId: null
        },
        own: own
      }));
      req.end();

      
    });

    it('return uniqueId if given', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'POST',
        url: '/DodontoFServer',
        headers: {
          "Content-Type": "application/x-msgpack"
        }
      });
      var match = router.match(req.url);
      match.fn(req, res, match);


    	res.end = (data) => {
        data = JSON.parse(data);
        assert.equal(data.uniqueId, "uniqueId");
      }

      nock('http://nock')
       .get(/.*/)
       .reply(200, []);
      req.write(msgpack.encode({
        cmd: "getLoginInfo",
        room: 0,
        params: {
          uniqueId: "uniqueId"
        },
        own: own
      }));
      req.end();

      
    });

  });
});