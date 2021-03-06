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

  describe('#getDiceBotInfos()', function() {
    it('basic request', function() {
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
        assert.equal(data, '[]');
      };

      nock('http://nock')
       .get('/DodontoF/getDiceBotInfos')
       .reply(200, []);
      req.write(msgpack.encode({
        cmd: "getDiceBotInfos",
        room: -1,
        params: {
          uniqueId: null
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
       .get('/DodontoF/getDiceBotInfos')
       .replyWithError('something awful happened');
      req.write(msgpack.encode({
        cmd: "getDiceBotInfos",
        room: -1,
        params: {
          uniqueId: null
        },
        own: own
      }));
      req.end();

      
    });
  });
});