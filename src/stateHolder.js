const fs = require('fs');

module.exports = {
  userList: [],
  roomData: [],
  load: (file) => {
    let stat = fs.statSync(file);
      if(stat){
      try{
        let data = JSON.parse(fs.readFileSync(file));
        module.exports = Object.assign(stateHolder, data);
      }catch(err){
        logger.error(err);
        process.exit(1);
      }
    }
  }
};

stateHolder = module.exports;