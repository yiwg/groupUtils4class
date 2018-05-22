var NoticeTask         = require('../proxy/index').WxUser;
var tools        = require('../common/tools');
var config       = require('../config');
//var EventProxy   = require('eventproxy');
var _            = require('lodash');
var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

exports.createNoticeTask=function (req, res, next) {
  logger.debug("进入createNoticeTask......"+JSON.stringify(req.body));
  var noticeTask;
  noticeTask.openid=req.query.openid;
  noticeTask.noticeid=req.query.noticeid;
  noticeTask.title=req.query.title;
  noticeTask.date=req.query.date;
  noticeTask.fileNumber=req.query.fileNumber;
  noticeTask.name=req.query.name;
  noticeTask.description=req.query.description;
  NoticeTask.newAndSave(noticeTask.openid, noticeTask.noticeid,noticeTask.date, noticeTask.fileNumber,
      noticeTask.title,noticeTask.description,noticeTask.name,function (err) {
      if(err){
        logger.error(err);
      }
  })
}