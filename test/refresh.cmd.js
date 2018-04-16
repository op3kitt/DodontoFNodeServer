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

const log4js = require('log4js');
log4js.configure({
    appenders: {
      all: { type: 'file', filename: 'logs/test.log' , maxLogSize: 10 * 1024 * 1024, backups: 5 }
    },
    categories: { default: { appenders: ['all'], level: 'debug' } }
  });
global.logger = log4js.getLogger('all');

describe('Cmd', function() {
  var router = require('../src/routes');
  var own = randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
    capitalization: 'lowercase'
  });

  describe('#refresh()', function() {
    it('rIndex is 0', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'POST',
        url: '/DodontoFServer',
        headers: {
          "Content-Type": "application/x-msgpack"
        }
      });
      
      res.end = (data) => {
        assert.equal("{}", data);
      };

      req.write(msgpack.encode({
        cmd: "refresh",
        room: 0,
        params: {
          rIndex: 0,
          name: "",
          times:  {
            effects: 0,
            time: 0,
            map: 0,
            chatMessageDataLog: 0,
            recordIndex: 0,
            characters: 0,
            playRoomInfo: 0,
            record: 0
          }
        },
        own: own
      }));

      req.end();
    });

    it('record', function() {
      var res = new MockRes();
      var req = new MockReq({
        method: 'POST',
        url: '/DodontoFServer',
        headers: {
          "Content-Type": "application/x-msgpack"
        }
      });
      
      res.end = (data) => {
        assert.equal("{}", data);
      };

      let now = new Date();
      req.write(msgpack.encode({
        cmd: "refresh",
        room: 0,
        params: {
          rIndex: 1,
          name: "test",
          times:  {
            effects: now.getTime(),
            time: now.getTime(),
            map: now.getTime(),
            chatMessageDataLog: now.getTime(),
            recordIndex: now.getTime(),
            characters: now.getTime(),
            playRoomInfo: now.getTime(),
            record: now.getTime()
          }
        },
        own: own
      }));

      req.end();
    });


  });
});