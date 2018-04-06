const routes = require('routes')();
const msgpack = require('msgpack-lite');

var defaultRoute = (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Server alives.");
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
          global.logger.debug("request:" , msg);
          
          res.setHeader("Content-Type", "application/json");
          require(`./cmd/${msg.cmd}`)(req, res, msg);
        }catch(e){
          global.logger.debug(e);
          defaultRoute(req, res);
        }
      });
      break;
  }
});

routes.addRoute(/^(.*)$/, defaultRoute);

module.exports = routes;