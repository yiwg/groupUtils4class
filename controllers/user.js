var User = require('../proxy/user');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

exports.index = function (req, res, next) {
  logger.debug("进入controllers/user.index")
  //User.newAndSave();
  /*var mongoose = require('mongoose');
  var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/campus');
  db.on('error', function(error) {
    console.log(error);
  });
  var mongooseSchema = new mongoose.Schema({
    username : {type : String, default : '匿名用户'},
    title    : {type : String},
    content  : {type : String},
    time     : {type : Date, default: Date.now},
    age      : {type : Number}
  });
  var mongooseModel = db.model('mongoose', mongooseSchema);
// 增加记录 基于 entity 操作
  var doc = {username : 'emtity_demo_username', title : 'emtity_demo_title', content : 'emtity_demo_content'};
  var mongooseEntity = new mongooseModel(doc);
  mongooseEntity.save(function(error) {
    if(error) {
      console.log(error);
    } else {
      console.log('saved OK!');
    }
    // 关闭数据库链接
    db.close();
  });*/

  User.newAndSave("yi", "yiweiguo", "1234456", "1234456", "1234456", 1, 2222,function (err) {
    if(err){
      logger.debug(err)
    }
    logger.debug("用户保存成功!")
    res.render('index', { title: 'Express' });
  });
};

