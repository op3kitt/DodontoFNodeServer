const assert = require('assert');
const requireNew = require('require-new');
const config = require('./module/config.js');
const path = require('path');
config.APP_PATH = path.resolve(__dirname+'/..');
const stateHolder = require('../src/stateHolder');
const messageSender = require('../src/messageSender');
var logger = require('./module/logger');

describe('messageSender', function() {

  describe('#send()', function() {
    it('send message', function() {
      let check = "check";
      stateHolder.userList.push({
        room:0,
        wsconnection: {
          connected: true,
          send: (str) => {
            assert.equal(str, check);
          }
        }
      });

      messageSender(check);
    });

    it('error while sending message', function() {
      let check = "check";
      stateHolder.userList.push({
        room:0,
        wsconnection: {
          connected: true,
          send: (str) => {
            throw "interrupt";
            assert.fail(true);
          }
        }
      });

      messageSender(check);
    });
  });
});