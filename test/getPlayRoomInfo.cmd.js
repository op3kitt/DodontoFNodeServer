const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const path = require('path');
const requireNew = require('require-new');
global.config = require('../src/config.js');
global.apppath = path.resolve(__dirname+'/..');
console.log(global.apppath);
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
    capitalization: 'lowervase'
  });

  describe('#getPlayRoomInfo()', function() {
    it('get room infomations', function() {
      global.stateHolder = requireNew('./testData.json')

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
        assert.equal(data.minRoom, 0);
        assert.equal(data.maxRoom, 9);
        assert.equal(data.playRoomStates.length, 10);
      };

      req.write(msgpack.encode({
        cmd: "getPlayRoomStates",
        room: -1,
        params: {
          minRoom: 0,
          maxRoom: 9
        },
        own: own
      }));
      req.end();

    });

    it('if illegal room numbers given', function() {
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

        assert.equal(data.minRoom, 9);
        assert.equal(data.maxRoom, 9);
        assert.equal(data.playRoomStates.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "getPlayRoomStates",
        room: -1,
        params: {
          minRoom: 15,
          maxRoom: 9
        },
        own: own
      }));
      req.end();

    });
  });
});