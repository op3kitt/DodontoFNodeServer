const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const requireNew = require('require-new');
const path = require('path');
const config = require('../src/config.js');
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

  describe('#changeRoundTime()', function() {
    it('change initiative', function() {
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
        assert.equal(stateHolder.roomData[0].data.roundTimeData.round, 4);
      };

      req.write(msgpack.encode({
        cmd: "changeRoundTime",
        room: 0,
        params: {
          counterNames: [],
          initiative: 1,
          round: 4
        },
        own: own
      }));
      req.end();

      
    });

    it('illegal round', function() {
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
        assert.equal(stateHolder.roomData[0].data.roundTimeData.round, 1);
        assert.equal(stateHolder.roomData[0].data.roundTimeData.initiative, 0);
        assert.equal(stateHolder.roomData[0].data.roundTimeData.counterNames.length, 2);
      };

      req.write(msgpack.encode({
        cmd: "changeRoundTime",
        room: 0,
        params: {
          counterNames: [],
          initiative: 1,
          round: "abc"
        },
        own: own
      }));
      req.end();

      
    });

    it('illegal initiative', function() {
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
        assert.equal(stateHolder.roomData[0].data.roundTimeData.round, 1);
        assert.equal(stateHolder.roomData[0].data.roundTimeData.initiative, 0);
        assert.equal(stateHolder.roomData[0].data.roundTimeData.counterNames.length, 2);
      };

      req.write(msgpack.encode({
        cmd: "changeRoundTime",
        room: 0,
        params: {
          counterNames: [],
          initiative: "abc",
          round: 4
        },
        own: own
      }));
      req.end();

      
    });

    it('illegal counterNames', function() {
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
        assert.equal(stateHolder.roomData[0].data.roundTimeData.round, 1);
        assert.equal(stateHolder.roomData[0].data.roundTimeData.initiative, 0);
        assert.equal(stateHolder.roomData[0].data.roundTimeData.counterNames.length, 2);
      };

      req.write(msgpack.encode({
        cmd: "changeRoundTime",
        room: 0,
        params: {
          counterNames: "illegal",
          initiative: 1,
          round: 4
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
        cmd: "changeRoundTime",
        room: 1,
        params: {
          counterNames: [],
          initiative: 1,
          round: 4
        },
        own: own
      }));
      req.end();

      
    });

  });
});