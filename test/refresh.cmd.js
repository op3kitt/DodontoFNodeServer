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
      var match = router.match(req.url);
      match.fn(req, res, match);
      
      res.end = (data) => {
        data = JSON.parse(data);
        
        assert.equal(data.hasOwnProperty('chatMessageDataLog'), true);
        assert.equal(data.hasOwnProperty('mapData'), true);
        assert.equal(data.hasOwnProperty('imageTags'), true);
        assert.equal(data.hasOwnProperty('characters'), true);
        assert.equal(data.hasOwnProperty('graveyard'), true);
        assert.equal(data.hasOwnProperty('cardTrushMount'), true);
        assert.equal(data.hasOwnProperty('cardMount'), true);
        assert.equal(data.hasOwnProperty('waitingRoom'), true);
        assert.equal(data.hasOwnProperty('roundTimeData'), true);
        assert.equal(data.hasOwnProperty('resource'), true);
        assert.equal(data.hasOwnProperty('effects'), true);
        assert.equal(data.hasOwnProperty('playRoomName'), true);
        assert.equal(data.hasOwnProperty('playRoomChangedPassword'), true);
        assert.equal(data.hasOwnProperty('chatChannelNames'), true);
        assert.equal(data.hasOwnProperty('canUseExternalImage'), true);
        assert.equal(data.hasOwnProperty('canVisit'), true);
        assert.equal(data.hasOwnProperty('gameType'), true);
        assert.equal(data.hasOwnProperty('viewStateInfo'), true);
        assert.equal(data.hasOwnProperty('backgroundImage'), true);
        assert.equal(data.hasOwnProperty('lastUpdateTimes'), true);
        assert.equal(data.hasOwnProperty('refreshIndex'), true);
        assert.equal(data.hasOwnProperty('loginUserInfo'), true);
        assert.equal(data.isFirstChatRefresh, true);
      };

      req.write(msgpack.encode({
        cmd: "refresh",
        room: 0,
        params: {
          rIndex: 0,
          name: "",
          times: {
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
      var match = router.match(req.url);
      match.fn(req, res, match);
      
      res.end = (data) => {
        data = JSON.parse(data);
        assert.equal(data.hasOwnProperty('isFirstChatRefresh', false));
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