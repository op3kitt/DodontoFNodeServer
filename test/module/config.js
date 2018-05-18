const config = require('../../src/config');
const path = require('path');

config.bcdiceUrl = "http://nock/";
config.server.port = 9000;
config.wsserver.port = 9002;
config.imageUploadSpace = path.resolve(__dirname+'/../image');
config.unremovablePlayRoomNumbers = [0];
config.isPasswordNeedForDeletePlayRoom = true;
config.loginTimeOut = 60;

module.exports = config;
