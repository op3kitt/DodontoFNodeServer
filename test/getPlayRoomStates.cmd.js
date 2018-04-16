const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const path = require('path');
const requireNew = require('require-new');
const config = require('../src/config.js');
config.APP_PATH = path.resolve(__dirname+'/..');
const stateHolder = require('../src/stateHolder');
var logger = require('./module/logger');

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowervase'
  });

  describe('#getPlayRoomInfo()', function() {
    it('get room infomations', function() {
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