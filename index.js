const http = require('http');
global.config = require('./src/config.js');
var router = require('./src/routes.js');
const url = require("url");
const logger = require('./src/logger');
const fs = require('fs');
config.APP_PATH = __dirname;

const server = http.createServer((req, res) => {
  var path = url.parse(req.url).pathname;
  var match = router.match(path);
  match.fn(req, res, match);
});
module.exports = server;

const stateHolder = require('./src/stateHolder');
stateHolder.load(`${config.APP_PATH}/data/save.json`);

try{
  server.listen(global.config.server.port);
  logger.debug(`Server start listening on port ${global.config.server.port}.`);
}catch(err){
  logger.debug(err);
  process.exit(1);
}

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  logger.debug(err);
});
server.on('close', () => {
  process.exit(0);
});

setInterval(() => {
  file = `${config.APP_PATH}/data/save.json`;
  fs.writeFileSync(file, JSON.stringify(global.stateHolder));
},15000);