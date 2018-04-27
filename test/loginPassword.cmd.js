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

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#loginPassword()', function() {
    it('check no-password room', function() {
      stateHolder.load('test/testData.json');
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