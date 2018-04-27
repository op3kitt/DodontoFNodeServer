const assert = require('assert');
const http = require('http');
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const msgpack = require('msgpack-lite');
const randomstring = require('randomstring');
const requireNew = require('require-new');
const path = require('path');
const config = require('./module/config.js');
config.APPPATH = path.resolve(__dirname+'/..');
const stateHolder = require('../src/stateHolder');
const logger = require('./module/logger');
const WebSocketClient = require('websocket').client;

describe('Server', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
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

  describe('#stateHolder()', function() {
    it('initialize', function() {
      var stateHolder = requireNew('../src/stateHolder.js');

      assert.equal(stateHolder.userList.length, 0);
      assert.equal(stateHolder.roomData.length, 0);
    });

    it('load saveData', function() {
      var stateHolder = requireNew('../src/stateHolder.js');
      stateHolder.load('test/testData.json');

      assert.equal(stateHolder.userList.length, 0);
    });

    it('load corrupted saveData', function() {
      var stateHolder = requireNew('../src/stateHolder.js');
      stateHolder.load('test/testDataCorrupted.json');

      assert.equal(stateHolder.userList.length, 0);
      assert.equal(stateHolder.roomData.length, 0);
    });

    it('load no exist saveData', function() {
      var stateHolder = requireNew('../src/stateHolder.js');
      stateHolder.load('test/testData_none.json');

      assert.equal(stateHolder.userList.length, 0);
      assert.equal(stateHolder.roomData.length, 0);
    });
  });

  describe('#config()', function() {
    it('default config loading', function() {
      var config_test = requireNew('../src/config');

      assert.notEqual(config_test, null);
    });

    it('file config loading', function() {
      var config_test = requireNew('../src/config');
      config_test.load('test/testConfig.json');

      assert.notEqual(config_test, null);
    });

    it('no-exist config loading', function() {
      var config_test = requireNew('../src/config');
      config_test.load('test/testConfig_none.json');

      assert.notEqual(config_test, null);
    });
  });

  describe('#app()', function() {
    let app;
    it('app loading', function() {
      app = require('../index.js');

      assert.ok(true);
    });

    it('websocket connection', function() {

      stateHolder.userList.push({
        own: "wstest",
        lastLoginTime: -1
      });

      var ws = new WebSocketClient();
      ws.on('connect', (ws) => {
        ws.send(msgpack.encode({room:-1,own:"wstest",params:{},cmd:"login"}));
      });
      ws.on('httpResponse', (response, client) => {
        ws.abort();
        app.http.close();
        app.websocket.close();
        assert.ok("true");
      });
      ws.connect(`ws://localhost:${config.wsserver.port}`, 'DodontoF-WebSocket', {});

    });
  });
});