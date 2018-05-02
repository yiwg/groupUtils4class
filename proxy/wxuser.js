var models  = require('../models/index');
var WxUser    = models.WxUser;
var utility = require('utility');
var uuid    = require('node-uuid');

/**
 * 根据用户名列表查找用户列表
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} names 用户名列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByOpenid = function (opendId, callback) {
  if (opendId.length === 0) {
    return callback(null, []);
  }
  User.find({ opendId: { $in: opendId } }, callback);
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
  User.findOne({loginname: loginname, retrieve_key: key}, callback);
};

exports.newAndSave = function (openId, AppID, arcID, avatarUrl, city, language,nickName,province,telNumber,uName,time,joinerNamem,joinerTel,joinerRemark, callback) {
  var wxuser         = new WxUser();
  wxuser.openId        = openId;
  wxuser.AppID   = AppID;
  wxuser.arcID        = arcID;
  wxuser.avatarUrl       = avatarUrl;
  wxuser.city      = city;
  wxuser.language      = language;
  wxuser.nickName = nickName;
  wxuser.province        = province;
  wxuser.telNumber   = telNumber;
  wxuser.uName        = uName;
  wxuser.time       = time;
  wxuser.joinerNamem      = joinerNamem;
  wxuser.joinerTel      = joinerTel;
  wxuser.joinerRemark = joinerRemark;
  user.save(callback);
};
