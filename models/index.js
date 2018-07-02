var mongoose = require('mongoose');
var config   = require('../config');
var log4js = require('log4js');
var logger = log4js.getLogger();
mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
  else {
    logger.debug("数据库连接成功!");
  }
});
// models
require('./user');
require('./wxuser');
require('./noticeTask');
require('./noticeUser');
require('./voteUser');
require('./voteTask');
require('./voteChatGroup');
exports.User         = mongoose.model('User');
exports.WxUser         = mongoose.model('WxUser');
exports.NoticeTask      = mongoose.model('NoticeTask');
exports.NoticeUser      = mongoose.model('NoticeUser');
exports.VoteUser      = mongoose.model('VoteUser');
exports.VoteTask      = mongoose.model('VoteTask');
exports.VoteCahtGroup      = mongoose.model('VoteCahtGroup');