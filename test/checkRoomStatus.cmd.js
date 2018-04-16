const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const requireNew = require('require-new');
const path = require('path');
global.config = require('../src/config.js');
global.APP_PATH = path.resolve(__dirname+'/..');
global.stateHolder = {
  userList: [],
  roomData: []
};

const log4js = require('log4js');
log4js.configure({
    appenders: {
      all: { type: 'file', filename: 'logs/test.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
    },
    categories: { default: { appenders: ['all'], level: 'debug' } }
  });
global.logger = log4js.getLogger('all');

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#checkRoomStatus()', function() {
    it('get exist room infos', function() {
      global.stateHolder = requireNew('./testData.json');
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
        assert.equal(data.isRoomExist, true);
        assert.equal(data.hasOwnProperty('canUseExternalImage'), true);
        assert.equal(data.hasOwnProperty('canVisit'), true);
        assert.equal(data.hasOwnProperty('chatChannelNames'), true);
        assert.equal(data.hasOwnProperty('isMentenanceModeOn'), true);
        assert.equal(data.hasOwnProperty('isPasswordLocked'), true);
        assert.equal(data.hasOwnProperty('isWelcomeMessageOn'), true);
        assert.equal(data.hasOwnProperty('roomName'), true);
        assert.equal(data.roomNumber, 0);
      };

      req.write(msgpack.encode({
        cmd: "checkRoomStatus",
        room: -1,
        params: {
          roomNumber: 0
        },
        own: own
      }));
      req.end();

      
    });

    it('get non-exist room infos', function() {
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
        assert.equal(data.isRoomExist, false);
        assert.equal(data.hasOwnProperty('canUseExternalImage'), true);
        assert.equal(data.hasOwnProperty('canVisit'), true);
        assert.equal(data.hasOwnProperty('chatChannelNames'), true);
        assert.equal(data.hasOwnProperty('isMentenanceModeOn'), true);
        assert.equal(data.hasOwnProperty('isPasswordLocked'), true);
        assert.equal(data.hasOwnProperty('isWelcomeMessageOn'), true);
        assert.equal(data.hasOwnProperty('roomName'), true);
        assert.equal(data.roomNumber, 5);
      };

      req.write(msgpack.encode({
        cmd: "checkRoomStatus",
        room: -1,
        params: {
          roomNumber: 5
        },
        own: own
      }));
      req.end();

    });

    it('get password room infos', function() {
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
        assert.equal(data.isRoomExist, true);
        assert.equal(data.isPasswordLocked, true);
        assert.equal(data.roomNumber, 3);
      };

      req.write(msgpack.encode({
        cmd: "checkRoomStatus",
        room: -1,
        params: {
          roomNumber: 3
        },
        own: own
      }));
      req.end();

    });
  });
});