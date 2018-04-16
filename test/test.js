const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const requireNew = require('require-new');
const path = require('path');
global.config = require('../src/config.js');
global.APP_PATH = path.resolve(__dirname+'/..');
console.log(global.APP_PATH);
global.stateHolder = {
  userList: [],
  roomData: []
};

const logger = require('./module/logger');

describe('Server', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#config()', function() {
    it('config loading', function() {
      config_test = requireNew('../src/config.js');

      assert.notEqual(config_test, null);
    });
  });

  describe('#routing()', function() {
    it('no indexes', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'GET',
        url: '/'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      assert.equal(res._getString(), "403 Forbidden.");
    });

    it('not found', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'GET',
        url: '/no-exist.txt'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      res.end = (data) => {
        assert.equal(data, "404 Not Found.");
      }
    });

    it('illegal mimeType', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'GET',
        url: '/test.illegal'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      assert.equal(res._getString(), "");
    });

    it('assets', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'GET',
        url: '/index.txt'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      res.end = (data) => {
        assert.equal(data, "index");
      };
    });

    it('not defined command', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'POST',
        url: '/DodontoFServer'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      res.end = (data) => {
        assert.equal(data, "\"Server alives.\"");
      }

      req.write(msgpack.encode({
        cmd: "NotDefined",
        room: -1,
        params: {
          uniqueId: null
        },
        own: own
      }));
      req.end();
    });

    it('post illegal data', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'POST',
        url: '/DodontoFServer'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      res.end = (data) => {
        assert.equal(data, "\"sent data is corrupted.\"");
      }

      req.write(msgpack.encode({
        cmd: "NotDefined",
        room: -1,
        params: {
          uniqueId: null
        },
        own: own
      }).slice(3));
      req.end();
    });
  });

  describe('#default()', function() {
    it('basic response when server alives', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'GET',
        url: '/DodontoFServer'
      });
      var match = router.match(req.url);
      match.fn(req, res, match);

      assert.equal(res._getString(), "\"Server alives.\"");
    });
  });


  describe('#app()', function() {
    it('app loading', function() {
      app = require('../index.js');

      assert.ok(true);

      app.close();
    });
  });
});