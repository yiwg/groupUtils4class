var User = require('../proxy/user');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

exports.index = function (req, res, next) {
  logger.debug("进入controllers/user.index")
  //User.newAndSave();
  User.newAndSave("yi", "yiweiguo", "1234456", "1234456", "1234456", 1, function (err) {
    if(err){
      logger.debug(err)
    }
    logger.debug("用户保存成功!")
    res.render('index', { title: 'Express' });
  });
};

