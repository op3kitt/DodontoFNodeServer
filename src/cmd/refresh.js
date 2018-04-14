
module.exports = (req, res, msg) => {
  global.logger.debug('refresh start');
console.log(msg);
  if(msg.params.rIndex == 0){
    res.end("{}");
  }else{
    res.end("{}");
  }

  global.logger.debug('refresh end:', {});
}