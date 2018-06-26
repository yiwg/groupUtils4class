var NoticeTask         = require('../proxy/index').NoticeTask;
var tools        = require('../common/tools');
var config       = require('../config');
//var EventProxy   = require('eventproxy');
var _            = require('lodash');
var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

exports.createNoticeTask=function (req, res, next) {
  logger.debug("进入createNoticeTask......"+JSON.stringify(req.query));
  var noticeTask={};
  noticeTask.openid=req.query.openid;
  noticeTask.noticeid=req.query.noticeid;
  noticeTask.title=req.query.title;
  noticeTask.date=req.query.date;
  noticeTask.fileNumber=req.query.fileNumber;
  noticeTask.name=req.query.name;
  noticeTask.description=req.query.description;
  NoticeTask.newAndSave(noticeTask.openid, noticeTask.noticeid,noticeTask.date, noticeTask.fileNumber,
      noticeTask.title,noticeTask.description,noticeTask.name,function (err) {
        logger.debug("进入NoticeTask.newAndSave......")
        if(err){
          logger.error(err);
        }
          else res.end();
  })
}

exports.getNoticeTask=function (req, res, next) {
  logger.debug("进入getNoticeTask......"+JSON.stringify(req.query));
  var noticeTask={};
  noticeTask.noticeid=req.query.noticeid;
  logger.debug("noticeid:"+noticeTask.noticeid)
  NoticeTask.getNtByNtId(noticeTask.noticeid,function (err,nt) {
      if(err){
        logger.error(err);
      }
      logger.debug("nt:"+nt.date)
      res.end(JSON.stringify(nt))
      })
}

exports.getAllViewer=function (req, res, next) {
    logger.debug("getAllViewer......"+JSON.stringify(req.query));
    var noticeTask={};
    noticeTask.noticeid=req.query.noticeid;
    logger.debug("noticeid:"+noticeTask.noticeid)
    NoticeTask.getAllViewer(noticeTask.noticeid,function (err,nt) {
        if(err){
            logger.error(err);
        }
        logger.debug("nt:"+nt.date)
        res.end(JSON.stringify(nt))
    })
}

exports.storeViewerInfor=function (req, res, next) {
    logger.debug("storeViewerInfor......"+JSON.stringify(req.query));
    var noticeUser={};
    noticeUser.noticeId=req.query.noticeid;
    noticeUser.openId=req.query.openid;
    NoticeTask.getNUByQuery(noticeUser,function (err,nu) {
        if(err){
            logger.debug(err);
        } else{
            logger.debug("nu="+nu.openId);
            if(nu.length>0){
                logger.info("浏览用户已存在");
            } else{
                NoticeTask.newAndSaveNU( noticeUser.openId,noticeUser.noticeId,function (err) {
                    if(err){
                        logger.error(err);
                    }else {
                        logger.debug("浏览用户信息保存成功");
                    }
                })
            }

        }
    })
    res.end();

}
exports.myCreate=function (req, res, next) {
    logger.debug("myCreate......"+JSON.stringify(req.query));
    var noticeUser={};
    noticeUser.openId=req.query.openid;
    NoticeTask.getNtByOpenId(noticeUser.openId,function (err,nt) {
        if(err){
            logger.error(err);
        }
        //logger.debug("nt:"+nt.date)
        res.end(JSON.stringify(nt))
    })
}

exports.myView=function (req, res, next) {
    logger.debug("myView......"+JSON.stringify(req.query));
    var noticeUser={};
    noticeUser.openId=req.query.openid;
    logger.debug("myView......openId="+ noticeUser.openId);
    NoticeTask.getViewNt(noticeUser.openId,function (err,nt) {
        if(err){
            logger.error(err);
        }else {
            res.end(JSON.stringify(nt))
        }
    })
}