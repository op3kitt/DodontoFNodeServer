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

  describe('#removeCharacter()', function() {
    it('move Character to graveyard', function() {
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

        assert.equal(data[0], null);

        assert.equal(stateHolder.roomData[0].data.graveyard.length, 2);
      };

      req.write(msgpack.encode({
        cmd: "removeCharacter",
        room: 0,
        params: {
          imgId: "character_test",
          isGotoGraveyard: true
        },
        own: own
      }));
      req.end();


    });

    it('remove Character', function() {
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

        assert.equal(data[0], null);

        assert.equal(stateHolder.roomData[0].data.graveyard.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "removeCharacter",
        room: 0,
        params: {
          imgId: "character_test",
          isGotoGraveyard: false
        },
        own: own
      }));
      req.end();
    });

    it('empty room', function() {
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

        assert.equal(data[0], null);
      };

      req.write(msgpack.encode({
        cmd: "removeCharacter",
        room: 1,
        params: {
          imgId: "character_test",
          isGotoGraveyard: false
        },
        own: own
      }));
      req.end();
    });

    it('no exists character', function() {
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

        assert.equal(data[0], null);
      };

      req.write(msgpack.encode({
        cmd: "removeCharacter",
        room: 0,
        params: {
          imgId: "character_test_noexists",
          isGotoGraveyard: false
        },
        own: own
      }));
      req.end();
    });


  });
});
