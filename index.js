const http = require('http');
const WebSocketServer = require('websocket').server;
const MockRes = require('mock-res');
const MockReq = require('mock-req');
const config = require('./src/config.js');
config.load('config.json');
var router = require('./src/routes.js');
const url = require("url");
const logger = require('./src/logger');
const fs = require('fs');
config.APP_PATH = __dirname;
const JSON = require('circular-json');

const server = http.createServer((req, res) => {
  var path = url.parse(req.url).pathname;
  var match = router.match(path);
  match.fn(req, res, match);
});
const server2 = http.createServer((req, res) => {
});
module.exports = {http: server, websocket: server2};

const stateHolder = require('./src/stateHolder');
stateHolder.load(`${config.APP_PATH}/data/save.json`);

try{
  server.listen(config.server.port);
  server2.listen(config.wsserver.port);
  logger.debug(`Server start listening on port ${config.server.port}.`);
}catch(err){
  logger.debug(err);
  process.exit(1);
}

wsServer = new WebSocketServer({
  httpServer: server2,
  autoAcceptConnections: false
});

wsServer.on('request', function(request) {
  if(request.requestedProtocols.length == 0 || request.requestedProtocols[0] != 'dodontof-websocket'){
    request.reject();
    return;
  }
  var connection = request.accept('dodontof-websocket', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    var path = "/DodontoFServer.rb";
    var match = router.match(path);
    var res = new MockRes();
    var req = new MockReq({
      method: 'POST',
      url: '/DodontoFServer.rb'
    });
    req.wsconnection = connection;
    req.write(message.binaryData);
    res.end = (str) => {connection.sendUTF(str);};
    match.fn(req, res, match);
  });
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  logger.debug(err);
});
server.on('close', () => {
  process.exit(0);
});

setInterval(() => {
  stateHolder.userList = stateHolder.userList.filter(
    (item) => {
      if(item.wsconnection && !item.wsconnection.connected){
        return false;
      }else if(item.lastLoginTime == -1 || item.lastLoginTime > new Date().getTime() - config.loginTimeOut * 1000){
        return true;
      }else{
        if(item.wsconnection){
          item.wsconnection.close();
        }
        return false;
      }
    }
  );
  file = `${config.APP_PATH}/data/save.json`;
  fs.writeFileSync(file, JSON.stringify(stateHolder.roomData));
},15000);