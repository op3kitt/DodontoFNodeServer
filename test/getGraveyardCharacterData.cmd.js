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

  describe('#getGraveyardCharacterData()', function() {
    it('get graveyard character data', function() {
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

        assert.equal(data[0].imgId, "grave_character");
      };

      req.write(msgpack.encode({
        cmd: "getGraveyardCharacterData",
        room: 0,
        params: {
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
          assert.equal(data, "[]");
        };

        req.write(msgpack.encode({
          cmd: "getGraveyardCharacterData",
          room: 1,
          params: {
          },
          own: own
        }));
        req.end();
      });

  });
});
