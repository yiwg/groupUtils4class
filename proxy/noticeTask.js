var models  = require('../models/index');
var WxUser    = models.WxUser;
var NoticeTask    = models.NoticeTask;
var utility = require('utility');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';


exports.newAndSave = function (openId, noticeId, date, fileNumber, title, description,name,callback) {
  var noticeTask        = new NoticeTask();
  noticeTask.openId     = openId;
  noticeTask.noticeId   = noticeId;
  noticeTask.date       = date;
  noticeTask.fileNumber = fileNumber;
  noticeTask.title      = title;
  noticeTask.description= description;
  noticeTask.name       = name;
  noticeTask.save(callback);
};

/**
 * 根据用户名列表查找用户列表
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} names 用户名列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByOpenid = function (openId, callback) {
  if (openId.length === 0) {
    return callback(null, []);
  }
  WxUser.find({ openId: { $in: openId } }, callback);
};

/**
 * 更新用户信息
 */
exports.updateUserInfo = function (wxuser, callback) {
  logger.debug("进入updateUserInfo......")
  callback = callback || _.noop;
  if (!wxuser.openid) {
    return callback();
  }
  var query = { openId: wxuser.openid };
  WxUser.update(query, { $set: { avatarUrl: wxuser.avatarUrl ,city:wxuser.city,language:wxuser.language,nickName:wxuser.nickName,province:wxuser.province,time:wxuser.time} }, { multi: true }).exec(callback);
};


/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.getUsersByAppID = function (AppID, callback) {
  if (AppID.length === 0) {
    return callback(null, []);
  }
  User.find({ AppID: { $in: AppID } }, callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUsersByarcID = function (arcID, callback) {
  if (arcID.length === 0) {
    return callback(null, []);
  }
  User.find({ arcID: { $in: arcID } }, callback);
};

/**
 * 根据邮箱，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} email 邮箱地址
 * @param {Function} callback 回调函数
 */
exports.getUserByMail = function (email, callback) {
  User.findOne({email: email}, callback);
};

/**
 * 根据用户ID列表，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} ids 用户ID列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByIds = function (ids, callback) {
  User.find({'_id': {'$in': ids}}, callback);
};

/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query, '', opt, callback);
};

/**
 * 根据查询条件，获取一个用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {String} key 激活码
 * @param {Function} callback 回调函数
 */
exports.getUserByNameAndKey = function (loginname, key, callback) {
  WxUser.findOne({loginname: loginname, retrieve_key: key}, callback);
};


