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
  stateHolder.load("test/testData.json");
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#moveCharacter()', function() {
    it('move character', function() {
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
        assert.equal(stateHolder.roomData[0].data.record.length, 2);
        assert.equal(stateHolder.roomData[0].data.characters[0].x, 10);
        assert.equal(stateHolder.roomData[0].data.characters[0].y, 11);
      };

      req.write(msgpack.encode({
        cmd: "moveCharacter",
        room: 0,
        params: {
          imgId: "character_test",
          x: 10,
          y: 11
        },
        own: own
      }));
      req.end();

      
    });

    it('not exist character', function() {
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
        assert.equal(stateHolder.roomData[0].data.record.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "moveCharacter",
        room: 0,
        params: {
          imgId: "character_test_none",
          x: 10,
          y: 10
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
        data = JSON.parse(data);

        assert.equal(data[0], null);
      };

      req.write(msgpack.encode({
        cmd: "moveCharacter",
        room: 1,
        params: {
          imgId: "character_test",
          x: 10,
          y: 10
        },
        own: own
      }));
      req.end();

      
    });

    it('illegal x', function() {
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
        assert.equal(stateHolder.roomData[0].data.record.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "moveCharacter",
        room: 0,
        params: {
          imgId: "character_test",
          x: "a",
          y: 10
        },
        own: own
      }));
      req.end();

      
    });

    it('illegal y', function() {
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
        assert.equal(stateHolder.roomData[0].data.record.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "moveCharacter",
        room: 0,
        params: {
          imgId: "character_test",
          x: 10,
          y: "a"
        },
        own: own
      }));
      req.end();

      
    });
  });

});