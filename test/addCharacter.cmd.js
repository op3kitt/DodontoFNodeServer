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

  describe('#addCharacter()', function() {
    it('add new character data', function() {
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

        assert.equal(data.addFailedCharacterNames.length, 0);
      };

      req.write(msgpack.encode({
        cmd: "addCharacter",
        room: 0,
        params: {
          counters: {},
          imgId: "",
          name: "test",
          dogTag: "",
          size: 1,
          url: "",
          draggable: true,
          imageName: "image/defaultImageSet/pawn/pawnBlack.png",
          images: [],
          info: "",
          initiative: 0.0,
          isHide: false,
          mirrored: false,
          rotation: 0,
          statusAlias: {},
          type: "characterData",
          x: 0,
          y: 0
        },
        own: own
      }));

      req.end();
    });


    it('add first record', function() {
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

        assert.equal(data.addFailedCharacterNames.length, 0);
        assert.equal(stateHolder.roomData[3].data.record.length, 1);
      };

      req.write(msgpack.encode({
        cmd: "addCharacter",
        room: 3,
        params: {
          counters: {},
          imgId: "",
          name: "test",
          dogTag: "",
          size: 1,
          url: "",
          draggable: true,
          imageName: "image/defaultImageSet/pawn/pawnBlack.png",
          images: [],
          info: "",
          initiative: 0.0,
          isHide: false,
          mirrored: false,
          rotation: 0,
          statusAlias: {},
          type: "characterData",
          x: 0,
          y: 0
        },
        own: own
      }));

      req.end();
    });

    it('add character data with same name', function() {
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

        assert.equal(data.addFailedCharacterNames[0], "exists");
      };

      req.write(msgpack.encode({
        cmd: "addCharacter",
        room: 0,
        params: {
          counters: {},
          imgId: "",
          name: "exists",
          dogTag: "",
          size: 1,
          url: "",
          draggable: true,
          imageName: "image/defaultImageSet/pawn/pawnBlack.png",
          images: [],
          info: "",
          initiative: 0.0,
          isHide: false,
          mirrored: false,
          rotation: 0,
          statusAlias: {},
          type: "characterData",
          x: 0,
          y: 0
        },
        own: own
      }));

      req.end();
    });

    it('add character data to empty room', function() {
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
        assert.equal(data, "");
      };

      req.write(msgpack.encode({
        cmd: "addCharacter",
        room: 1,
        params: {
          counters: {},
          imgId: "",
          name: "exists",
          dogTag: "",
          size: 1,
          url: "",
          draggable: true,
          imageName: "image/defaultImageSet/pawn/pawnBlack.png",
          images: [],
          info: "",
          initiative: 0.0,
          isHide: false,
          mirrored: false,
          rotation: 0,
          statusAlias: {},
          type: "characterData",
          x: 0,
          y: 0
        },
        own: own
      }));

      req.end();
    });
  });
});