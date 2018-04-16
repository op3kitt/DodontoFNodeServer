const http = require('http');
global.config = require('./src/config.js');
var router = require('./src/routes.js');
const url = require("url");
const log4js = require('log4js');
const fs = require('fs');
log4js.configure(global.config.logger);
global.logger = log4js.getLogger('all');
global.APP_PATH = __dirname;

const server = http.createServer((req, res) => {
  var path = url.parse(req.url).pathname;
  var match = router.match(path);
  match.fn(req, res, match);
});
module.exports = server;

global.stateHolder = {
  userList: [],
  roomData: []
};

file = `${global.APP_PATH}/data/save.json`;
fs.stat(file, (err, stat) => {
  if(!err){
    try{
      global.stateHolder = JSON.parse(fs.readFileSync(file));
    }catch(err){
      logger.error(err);
      process.exit(1);
    }
  }
});

try{
  server.listen(global.config.server.port);
  global.logger.debug(`Server start listening on port ${global.config.server.port}.`);
}catch(err){
  global.logger.debug(err);
  process.exit(1);
}

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  global.logger.debug(err);
});
server.on('close', () => {
  process.exit(0);
});

setInterval(() => {
  file = `${global.APP_PATH}/data/save.json`;
  fs.writeFileSync(file, JSON.stringify(global.stateHolder));
},15000);