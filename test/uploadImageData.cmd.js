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
const rimraf = require('rimraf').sync;

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#uploadImageData()', function() {
    it('upload an image', function() {
      rimraf(`${config.imageUploadSpace}/public`);
      rimraf(`${config.imageUploadSpace}/room_0`);

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

        assert.equal(data.resultText, "OK");
      };

      image = new Uint8Array([196,142,137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,2,0,0,0,144,119,83,222,0,0,0,1,115,82,71,66,0,174,206,28,233,0,0,0,4,103,65,77,65,0,0,177,143,11,252,97,5,0,0,0,32,99,72,82,77,0,0,122,38,0,0,128,132,0,0,250,0,0,0,128,232,0,0,117,48,0,0,234,96,0,0,58,152,0,0,23,112,156,186,81,60,0,0,0,12,73,68,65,84,24,87,99,248,255,255,63,0,5,254,2,254,167,53,129,132,0,0,0,0,73,69,78,68,174,66,96,130]);

      req.write(msgpack.encode({
        cmd: "uploadImageData",
        room: 0,
        params: {
          password: "",
          tags: ["キャラクター画像"],
          roomNumber: 0,
          imageFileName: "test.png",
          imageData: image,
          smallImageData: image
        },
        own: own
      }));
      req.end();

      
    });

    it('upload a public image', function() {
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

        assert.equal(data.resultText, "OK");
      };

      image = new Uint8Array([196,142,137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,2,0,0,0,144,119,83,222,0,0,0,1,115,82,71,66,0,174,206,28,233,0,0,0,4,103,65,77,65,0,0,177,143,11,252,97,5,0,0,0,32,99,72,82,77,0,0,122,38,0,0,128,132,0,0,250,0,0,0,128,232,0,0,117,48,0,0,234,96,0,0,58,152,0,0,23,112,156,186,81,60,0,0,0,12,73,68,65,84,24,87,99,248,255,255,63,0,5,254,2,254,167,53,129,132,0,0,0,0,73,69,78,68,174,66,96,130]);

      req.write(msgpack.encode({
        cmd: "uploadImageData",
        room: 0,
        params: {
          password: "",
          tags: ["キャラクター画像"],
          imageFileName: "test.png",
          imageData: image,
          smaillImageData: image
        },
        own: own
      }));
      req.end();

      
    });

    it('upload an image with directory', function() {

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

        assert.equal(data.resultText, "OK");
      };

      image = new Uint8Array([196,142,137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,2,0,0,0,144,119,83,222,0,0,0,1,115,82,71,66,0,174,206,28,233,0,0,0,4,103,65,77,65,0,0,177,143,11,252,97,5,0,0,0,32,99,72,82,77,0,0,122,38,0,0,128,132,0,0,250,0,0,0,128,232,0,0,117,48,0,0,234,96,0,0,58,152,0,0,23,112,156,186,81,60,0,0,0,12,73,68,65,84,24,87,99,248,255,255,63,0,5,254,2,254,167,53,129,132,0,0,0,0,73,69,78,68,174,66,96,130]);

      req.write(msgpack.encode({
        cmd: "uploadImageData",
        room: 0,
        params: {
          password: "",
          tags: ["キャラクター画像"],
          roomNumber: 0,
          imageFileName: "test.png",
          imageData: image,
          smallImageData: image
        },
        own: own
      }));
      req.end();

      
    });

    it('upload a public image with directory', function() {
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

        assert.equal(data.resultText, "OK");
      };

      image = new Uint8Array([196,142,137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,2,0,0,0,144,119,83,222,0,0,0,1,115,82,71,66,0,174,206,28,233,0,0,0,4,103,65,77,65,0,0,177,143,11,252,97,5,0,0,0,32,99,72,82,77,0,0,122,38,0,0,128,132,0,0,250,0,0,0,128,232,0,0,117,48,0,0,234,96,0,0,58,152,0,0,23,112,156,186,81,60,0,0,0,12,73,68,65,84,24,87,99,248,255,255,63,0,5,254,2,254,167,53,129,132,0,0,0,0,73,69,78,68,174,66,96,130]);

      req.write(msgpack.encode({
        cmd: "uploadImageData",
        room: 0,
        params: {
          password: "",
          tags: ["キャラクター画像"],
          imageFileName: "test.png",
          imageData: image,
          smaillImageData: image
        },
        own: own
      }));
      req.end();

      
    });

  });
});