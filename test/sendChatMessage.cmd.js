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

  describe('#sendChatMessage()', function() {
    it('send message', function() {
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

        assert.equal(data[0], null);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog.length, 2);
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 0,
        params: {
          uniqueId: own,
          channel: 0,
          color: "000000",
          message: "test",
          senderName: "test"
        },
        own: own
      }));
      req.end();
    });

    it('send dummy message', function() {
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

        assert.equal(data[0], null);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog.length, 2);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog[1][1].uniqueId, "dummy");
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 0,
        params: {
          uniqueId: own,
          channel: 0,
          color: "000000",
          message: "test",
          senderName: "test",
          dummy: true
        },
        own: own
      }));
      req.end();

      
    });

    it('empty room', function() {
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

        assert.equal(data[0], null);
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 1,
        params: {
          uniqueId: own,
          channel: 0,
          color: "000000",
          message: "test",
          senderName: "test"
        },
        own: own
      }));
      req.end();

      
    });

    it('no channel', function() {
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

        assert.equal(data[0], null);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 0,
        params: {
          uniqueId: own,
          color: "000000",
          message: "test",
          senderName: "test"
        },
        own: own
      }));
      req.end();
    });

    it('no message', function() {
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

        assert.equal(data[0], null);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 0,
        params: {
          channel: 0,
          uniqueId: own,
          color: "000000",
          senderName: "test"
        },
        own: own
      }));
      req.end();

      
    });

    it('no color', function() {
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

        assert.equal(data[0], null);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 0,
        params: {
          channel: 0,
          uniqueId: own,
          message: "test",
          senderName: "test"
        },
        own: own
      }));
      req.end();

      
    });
    it('no name', function() {
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

        assert.equal(data[0], null);
        assert.equal(stateHolder.roomData[0].data.chatMessageDataLog.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "sendChatMessage",
        room: 0,
        params: {
          channel: 0,
          uniqueId: own,
          color: "000000",
          message: "test",
        },
        own: own
      }));
      req.end();

      
    });
  });
});