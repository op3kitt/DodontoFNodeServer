const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');

const log4js = require('log4js');
global.logger = log4js.getLogger();

describe('Server', function() {
  var router = require('../src/routes.js');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowervase'
  });

  describe('#default()', function() {
    it('basic response when server alives', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'GET',
        url: '/'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      assert.equal(res._getString(), "Server alives.");
    });
  });

  describe('#getLoginInfos()', function() {
    it('first request to connect server', function() {
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

      req.write(msgpack.encode({
        cmd: "getLoginInfo",
        room: 0,
        params: {
          uniqueId: null
        },
        own: own
      }));
      req.end();

      
    	function end(data) {
        assert.notEqual(data.uniqueId, null);
      }
    });
  });
});