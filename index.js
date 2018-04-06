const http = require('http');
const config = require('./src/config.js');
var router = require('./src/routes.js');
const url = require("url");
const log4js = require('log4js');
log4js.configure(config.logger);
global.logger = log4js.getLogger('all');

const server = http.createServer((req, res) => {
  var path = url.parse(req.url).pathname;
  var match = router.match(path);
  match.fn(req, res, match);
});
server.listen(config.server.port);
global.logger.debug(`Server start listening on port ${config.server.port}.`);

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  logger.debug(err);
});