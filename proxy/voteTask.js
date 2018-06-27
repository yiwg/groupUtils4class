var models  = require('../models/index');
var WxUser    = models.WxUser;
var VoteTask    = models.VoteTask;
var VoteUser    = models.VoteUser;
var utility = require('utility');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

exports.newAndSave = function (openId,voteId,title,description,optionData,date,time,noName,radio,callback) {
  var voteTask        = new VoteTask();
  voteTask.openId     = openId;
  voteTask.voteId   = voteId;
  voteTask.title   = title;
  voteTask.description   = description;
  voteTask.optionData   = optionData;
  voteTask.time   = time;
  voteTask.date       = new Date(date);//.Format("yyyy-MM-dd HH:mm:ss");
  voteTask.noName = noName;
  voteTask.radio      = radio;
  voteTask.save(callback);
};
exports.getVtByVtId = function (voteId, callback) {
  if (voteId.length === 0) {
    return callback(null, []);
  }
  logger.debug("getVtByVtId......")
  VoteTask.find({ voteId: { $in: voteId } }, callback);
};
exports.storeVoteOne = function (voteTask,callback) {
  logger.debug("进入storeVoteOne......")
  callback = callback || _.noop;
  /*if (!voteTask) {
    return callback();
  }*/
  var query = { voteId: voteTask.voteId };
  logger.debug("进入storeVoteOne......1")
  var VoteUser=new VoteUser();
  VoteUser.openId=voteTask.openId;
  logger.debug("进入storeVoteOne......2")
  VoteUser.voteId=voteTask.voteId;
  logger.debug("进入storeVoteOne......3")
  VoteUser.save(callback)
  /*WxUser.update(query, { $set: { optionData: voteTask.optionData } }, { multi: true }).exec(function () {
        var VoteUser=new VoteUser();
        VoteUser.openId=voteTask.openId;
        VoteUser.voteId=voteTask.voteId;
        VoteUser.save(callback)
  }
  );*/
};
/*
exports.getNtByOpenId = function (openId, callback) {
  if (openId.length === 0) {
    return callback(null, []);
  }
  logger.debug("进入getNtByOpenId......")
  NoticeTask.find({ openId: { $in: openId } }, callback);
};
exports.getViewNt= function (openId, callback) {
  if (openId.length === 0) {
    return callback(null, []);
  }
  logger.debug("getViewNt......openId="+openId);
  NoticeUser.find({ openId: { $in: openId } }, function (err,Nu) {
    if(err){
      logger.error(err);
    }else{
      logger.debug("Nu.length="+Nu.length)
      var ntIds=new Array();
      for(i=0;i<Nu.length;i++){ //   var n in Nu) {
        ntIds[i]=Nu[i].noticeId;
      };
      logger.debug("ntIds.length="+ntIds.length)
      NoticeTask.find().where('noticeId',ntIds).exec(callback);
    }
  });
};

exports.getAllViewer= function (noticeId, callback) {
  if (noticeId.length === 0) {
    return callback(null, []);
  }
  logger.debug("getAllViewer......noticeId="+noticeId);
  NoticeUser.find({ noticeId: { $in: noticeId } }, function (err,Nu) {
    if(err){
      logger.error(err);
    }else{
      logger.debug("Nu.length="+Nu.length)
      var ntIds=new Array();
      for(i=0;i<Nu.length;i++){ //   var n in Nu) {
        ntIds[i]=Nu[i].openId;
      };
      logger.debug("ntIds.length="+ntIds.length)
      WxUser.find().where('openId',ntIds).exec(callback);
    }
  });
};

exports.getNUByQuery = function (noticeUser, callback) {
  if (noticeUser.noticeId.length === 0||noticeUser.openId===0) {
    return callback(null, []);
  }
  logger.debug("进入getNUByQuery......noticeUser.noticeId="+noticeUser.noticeId+"noticeUser.openId="+noticeUser.openId)
  NoticeUser.find({ noticeId: { $in: noticeUser.noticeId },openId:{ $in: noticeUser.openId} }, callback);
};

/!**
 * 更新用户信息
 *!/
exports.updateUserInfo = function (wxuser, callback) {
  logger.debug("进入updateUserInfo......")
  callback = callback || _.noop;
  if (!wxuser.openid) {
    return callback();
  }
  var query = { openId: wxuser.openid };
  WxUser.update(query, { $set: { avatarUrl: wxuser.avatarUrl ,city:wxuser.city,language:wxuser.language,nickName:wxuser.nickName,province:wxuser.province,time:wxuser.time} }, { multi: true }).exec(callback);
};


/!**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 *!/
exports.getUsersByAppID = function (AppID, callback) {
  if (AppID.length === 0) {
    return callback(null, []);
  }
  User.find({ AppID: { $in: AppID } }, callback);
};

/!**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 *!/
exports.getUsersByarcID = function (arcID, callback) {
  if (arcID.length === 0) {
    return callback(null, []);
  }
  User.find({ arcID: { $in: arcID } }, callback);
};

/!**
 * 根据邮箱，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 邮箱地址
 * @param {Function} callback 回调函数
 *!/
exports.getUserByMail = function (email, callback) {
  User.findOne({email: email}, callback);
};

/!**
 * 根据用户ID列表，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} ids 用户ID列表
 * @param {Function} callback 回调函数
 *!/
exports.getUsersByIds = function (ids, callback) {
  User.find({'_id': {'$in': ids}}, callback);
};

/!**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 *!/
exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query, '', opt, callback);
};

/!**
 * 根据查询条件，获取一个用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {String} key 激活码
 * @param {Function} callback 回调函数
 *!/
exports.getUserByNameAndKey = function (loginname, key, callback) {
  WxUser.findOne({loginname: loginname, retrieve_key: key}, callback);
};
*/


