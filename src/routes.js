const routes = require('routes')();
const msgpack = require('msgpack-lite');
const fs = require('fs');
const mime = require('mime');
const logger = require('./logger');
const config = require('./config');
const stateHolder = require('./stateHolder');
var defaultRoute = (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("\"Server alives.\"");
};

routes.addRoute('/DodontoFServer(\.rb)?', (req, res) => {
  switch(req.method){
    case "GET": 
      defaultRoute(req, res);
      break;
    case "POST": 
      req.on('data', (data) => {
        try{
          var msg = msgpack.decode(data);
          logger.debug("request:" , msg);
          
          if(typeof msg == "object"){
            res.setHeader("Content-Type", "application/json");
            require(`./cmd/${msg.cmd}`)(req, res, msg);

            stateHolder.userList.push({
              own: msg.own,
              room: msg.room,
              lastLoginTime: new Date().getTime()
            });
          }else{
            throw "sent data is corrupted."
          }
        }catch(e){
          logger.debug(e);
          if (e.code == 'MODULE_NOT_FOUND') {
            defaultRoute(req, res);
          }else{
            res.setHeader("Content-Type", "application/json");
            res.end(`"${e}"`);
          }
        }
      });
      break;
  }
});

routes.addRoute('*.*', (req, res, data) => {
  logger.debug(data);

  let file = `${config.APP_PATH}/assets${data.splats.join(".")}`;
  let mimeType = mime.getType(data.splats[1]);

  fs.stat(file, (err, stat) => {
    if(!mimeType || err) {
      logger.debug(err);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end("404 Not Found.");
    }else{
      //res.end(fs.readFileSync(file));
      fs.readFile(file, (err, data) => {
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
      });
    }
  });

});
routes.addRoute('*', (req, res, data) => {
  res.writeHead(403, { 'Content-Type': 'text/plain' });
  res.end("403 Forbidden.");
});

module.exports = routes;