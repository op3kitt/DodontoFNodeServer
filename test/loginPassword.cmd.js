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
global.stateHolder = {
  userList: [],
  roomData: []
};

const log4js = requireNew('log4js');
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

  describe('#loginPassword()', function() {
    it('check no-password room', function() {
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
        assert.equal(data.resultText, "OK");
        assert.equal(data.visiterMode, false);
        assert.equal(data.roomNumber, 0);
      };

      req.write(msgpack.encode({
        cmd: "loginPassword",
        room: -1,
        params: {
          roomNumber: 0,
          password: "",
          visiterMode: false
        },
        own: own
      }));
      req.end();

      
    });

    it('check no-exist room', function() {
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
        assert.equal(data.resultText, "プレイルームNo.2は作成されていません");
        assert.equal(data.visiterMode, false);
        assert.equal(data.roomNumber, 2);
      };

      req.write(msgpack.encode({
        cmd: "loginPassword",
        room: -1,
        params: {
          roomNumber: 2,
          password: "",
          visiterMode: false
        },
        own: own
      }));
      req.end();

    });

    it('check password room with incorrect password', function() {
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
        assert.equal(data.resultText, "passwordMismatch");
        assert.equal(data.visiterMode, false);
        assert.equal(data.roomNumber, 3);
      };

      req.write(msgpack.encode({
        cmd: "loginPassword",
        room: -1,
        params: {
          roomNumber: 3,
          password: "wrong password",
          visiterMode: false
        },
        own: own
      }));

    });

    it('check password room', function() {
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
        assert.equal(data.visiterMode, false);
        assert.equal(data.roomNumber, 3);
      };

      req.write(msgpack.encode({
        cmd: "loginPassword",
        room: -1,
        params: {
          roomNumber: 3,
          password: "test",
          visiterMode: false
        },
        own: own
      }));

    });

    it('check visiterMode', function() {
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
        assert.equal(data.visiterMode, true);
        assert.equal(data.roomNumber, 0);
      };

      req.write(msgpack.encode({
        cmd: "loginPassword",
        room: -1,
        params: {
          roomNumber: 0,
          password: "",
          visiterMode: true
        },
        own: own
      }));

    });
  });
});