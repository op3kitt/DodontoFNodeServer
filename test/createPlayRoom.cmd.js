const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const requireNew = require('require-new');
const path = require('path');
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
    capitalization: 'lowercase'
  });

  describe('#createPlayRoom()', function() {
    it('create room', function() {
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

        assert.equal(data.resultText, "OK");
        assert.equal(data.playRoomIndex, 1);
      };

      req.write(msgpack.encode({
        cmd: "createPlayRoom",
        room: -1,
        params: {
          playRoomIndex: -1,
          playRoomName: "test",
          playRoomPassword: "",
          gameType: "",
          canVisit: true,
          canUseExternalImage: false,
          chatChannelNames: [],
          viewStates: {},
          createPassword: ""
        },
        own: own
      }));

      req.end();
    });

    it('create already exists room', function() {
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

        assert.equal(data.resultText, "It is not empty.");
      };

      req.write(msgpack.encode({
        cmd: "createPlayRoom",
        room: -1,
        params: {
          playRoomIndex: 0,
          playRoomName: "test",
          playRoomPassword: "",
          gameType: "",
          canVisit: true,
          canUseExternalImage: false,
          chatChannelNames: [],
          viewStates: {},
          createPassword: ""
        },
        own: own
      }));

      req.end();
    });

    it('create illeagal room', function() {
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

        assert.equal(data.resultText, "noEmptyPlayRoom");
      };

      req.write(msgpack.encode({
        cmd: "createPlayRoom",
        room: -1,
        params: {
          playRoomIndex: 9999,
          playRoomName: "test",
          playRoomPassword: "",
          gameType: "",
          canVisit: true,
          canUseExternalImage: false,
          chatChannelNames: [],
          viewStates: {},
          createPassword: ""
        },
        own: own
      }));

      req.end();
    });

    it('create password room', function() {
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

        assert.equal(data.resultText, "OK");
      };

      req.write(msgpack.encode({
        cmd: "createPlayRoom",
        room: -1,
        params: {
          playRoomIndex: 8,
          playRoomName: "test",
          playRoomPassword: "test",
          gameType: "",
          canVisit: true,
          canUseExternalImage: false,
          chatChannelNames: [],
          viewStates: {},
          createPassword: ""
        },
        own: own
      }));

      req.end();
    });

    it('create room with required password mode', function() {
      global.config.createPlayRoomPassword = "test";
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

        assert.equal(data.resultText, "OK");
      };

      req.write(msgpack.encode({
        cmd: "createPlayRoom",
        room: -1,
        params: {
          playRoomIndex: 5,
          playRoomName: "test",
          playRoomPassword: "",
          gameType: "",
          canVisit: true,
          canUseExternalImage: false,
          chatChannelNames: [],
          viewStates: {},
          createPassword: "test"
        },
        own: own
      }));

      req.end();
    });

    it('create room with incorrect password', function() {
      global.config.createPlayRoomPassword = "test";
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

        assert.equal(data.resultText, "Password is required to create play room.");
      };

      req.write(msgpack.encode({
        cmd: "createPlayRoom",
        room: -1,
        params: {
          playRoomIndex: 9,
          playRoomName: "test",
          playRoomPassword: "",
          gameType: "",
          canVisit: true,
          canUseExternalImage: false,
          chatChannelNames: [],
          viewStates: {},
          createPassword: "wrong password"
        },
        own: own
      }));

      req.end();
    });

  });
});