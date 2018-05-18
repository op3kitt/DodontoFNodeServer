const assert = require('assert');
const http = require('http');
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
const fs = require('fs');

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#removePlayRoom()', function() {
    it('remove no password room', function() {
      stateHolder.load("test/testData.json");
      fs.mkdirSync(`${config.imageUploadSpace}/room_6`, 777);
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

        assert.equal(data.deletedRoomNumbers[0], 6);
        assert.equal(data.askDeleteRoomNumbers.length, 0);
        assert.equal(data.passwordRoomNumbers.length, 0);
        assert.equal(data.errorMessages.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [6, 1],
          password: "",
          ignoreLoginUser: true,
          isForce: false
        },
        own: own
      }));
      req.end();
    });

    it('remove unremovable room', function() {
      stateHolder.load("test/testData.json");
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

        assert.equal(data.deletedRoomNumbers.length, 0);
        assert.equal(data.askDeleteRoomNumbers.length, 0);
        assert.equal(data.passwordRoomNumbers.length, 0);
        assert.equal(data.errorMessages[0], "unremovablePlayRoomNumber");
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [0],
          password: "",
          ignoreLoginUser: false,
          isForce: false
        },
        own: own
      }));
      req.end();
    });

    it('remove passworded room', function() {
      stateHolder.load("test/testData.json");
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

        assert.equal(data.deletedRoomNumbers[0], 3);
        assert.equal(data.askDeleteRoomNumbers.length, 0);
        assert.equal(data.passwordRoomNumbers.length, 0);
        assert.equal(data.errorMessages.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [3],
          password: "test",
          ignoreLoginUser: false,
          isForce: false
        },
        own: own
      }));
      req.end();
    });


    it('remove passworded room with wrong password', function() {
      stateHolder.load("test/testData.json");
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

        assert.equal(data.deletedRoomNumbers.length, 0);
        assert.equal(data.askDeleteRoomNumbers.length, 0);
        assert.equal(data.passwordRoomNumbers[0], 3);
        assert.equal(data.errorMessages.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [3],
          password: "test2",
          ignoreLoginUser: false,
          isForce: false
        },
        own: own
      }));
      req.end();
    });

    it('remove active room', function() {
      stateHolder.load("test/testData.json");
      stateHolder.roomData[6].data.login.push({name:"test", timeSeconds:new Date().getTime()});
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

        assert.equal(data.deletedRoomNumbers.length, 0);
        assert.equal(data.askDeleteRoomNumbers[0], 6);
        assert.equal(data.passwordRoomNumbers.length, 0);
        assert.equal(data.errorMessages.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [6],
          password: "test",
          ignoreLoginUser: false,
          isForce: false
        },
        own: own
      }));
      req.end();
    });


    it('remove passworded room force', function() {
      stateHolder.load("test/testData.json");
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

        assert.equal(data.deletedRoomNumbers[0], 3);
        assert.equal(data.askDeleteRoomNumbers.length, 0);
        assert.equal(data.passwordRoomNumbers.length, 0);
        assert.equal(data.errorMessages.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [3],
          password: null,
          ignoreLoginUser: false,
          isForce: false
        },
        own: own
      }));
      req.end();
    });


    it('remove passworded room with no password', function() {
      stateHolder.load("test/testData.json");
      config.isPasswordNeedForDeletePlayRoom = false;
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

        assert.equal(data.deletedRoomNumbers[0], 3);
        assert.equal(data.askDeleteRoomNumbers.length, 0);
        assert.equal(data.passwordRoomNumbers.length, 0);
        assert.equal(data.errorMessages.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "removePlayRoom",
        room: -1,
        params: {
          roomNumbers: [3],
          password: "test2",
          ignoreLoginUser: false,
          isForce: true
        },
        own: own
      }));
      req.end();
    });
  });
});
