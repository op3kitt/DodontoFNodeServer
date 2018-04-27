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

  describe('#sendDiceBotChatMessage()', function() {
    it('dice command', function() {
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
        assert.equal('[]', data);
      };

      nock('http://nock')
       .get(/.*/)
       .reply(200, {result: "[1, 1] -> 2", dices: [[1,6],[1,6]]});
      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: 0,
          name: "test",
          message: "2d6",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();
    });

    it('empty room', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 1,
        params: {
          channel: 0,
          repeatCount: 1,
          name: "test",
          message: "2d6",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();

      
    });

    it('wrong channel', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: "aa",
          repeatCount: 0,
          name: "test",
          message: "2d6",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();
    });

    it('wrong repeatCount', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: "aa",
          name: "test",
          message: "2d6",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();
    });

    it('wrong name', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: 0,
          message: "2d6",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();
    });

    it('wrong message', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: 0,
          name: "test",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();
    });

    it('wrong color', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: 0,
          name: "test",
          message: "2d6",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();
    });

    it('wrong gameType', function() {
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
        assert.equal('[]', data);
      };

      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: 0,
          name: "test",
          message: "2d6",
          color: "000000",
        },
        own: own
      }));
      req.end();
    });

    it('bcdiced is down', function() {
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
        assert.ok(true);
      };

      nock('http://nock')
       .get(/\/DodontoF\/sendDiceBotChatMessage\/.*/)
       .replyWithError('something awful happened');
      req.write(msgpack.encode({
        cmd: "sendDiceBotChatMessage",
        room: 0,
        params: {
          channel: 0,
          repeatCount: 1,
          name: "test",
          message: "2d6",
          color: "000000",
          gameType: "DefaultDiceBot"
        },
        own: own
      }));
      req.end();

      
    });
  });
});