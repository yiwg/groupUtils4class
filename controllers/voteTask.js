var VoteTask         = require('../proxy/index').VoteTask;
var tools        = require('../common/tools');
var config       = require('../config');
//var EventProxy   = require('eventproxy');
var _            = require('lodash');
var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
exports.createVoteTask=function (req, res, next) {
  logger.debug("进入createVoteTask......"+JSON.stringify(req.query));
  var voteTask={};
    voteTask.openId     = req.query.openid;
    voteTask.voteId   = req.query.voteid;
    voteTask.title   = req.query.title;
    voteTask.description   = req.query.description;
    voteTask.optionData   = req.query.optionData;
    voteTask.time   = req.query.time;
    voteTask.date       = req.query.date;//.Format("yyyy-MM-dd HH:mm:ss");
    voteTask.noName = req.query.noName;
    voteTask.radio      = req.query.radio;

   VoteTask.newAndSave(voteTask.openId,voteTask.voteId,voteTask.title,voteTask.description,
       voteTask.optionData,voteTask.date,voteTask.time,voteTask.noName,voteTask.radio,function (err) {
        logger.debug("进入NoticeTask.newAndSave......")
        if(err){
          logger.error(err);
        }
          else res.end();
  })
}


exports.getVoteTask=function (req, res, next) {
  logger.debug("getVoteTask......"+JSON.stringify(req.query));
  var voteTask={};
    voteTask.voteId=req.query.voteid;
  logger.debug("voteId:"+voteTask.voteId)
  VoteTask.getVtByVtId(voteTask.voteId,function (err,vt) {
      if(err){
        logger.error(err);
      }
      logger.debug("nt:"+vt.date)
      res.end(JSON.stringify(vt))
      })
}

exports.storeVoteOne=function (req, res, next) {
    logger.debug("storeVoteOne......"+JSON.stringify(req.query));
    var voteTask={};
    voteTask.voteId=req.query.voteid;
    voteTask.openId=req.query.openid;
    voteTask.optionData=req.query.optionData;
    logger.debug("voteId:"+voteTask.voteId)
    VoteTask.storeVoteOne(voteTask,function (err) {
        if(err){
            logger.error(err);
        }
       // logger.debug("nt:"+vt.date)
        res.end()
    })
}

exports.myJoin=function (req, res, next) {
    logger.debug("myJoin......"+JSON.stringify(req.query));
    var voteUser={};
    voteUser.openId=req.query.openid;
    logger.debug("myJoin......openId="+ voteUser.openId);
    VoteTask.getJoinVt(voteUser.openId,function (err,nt) {
        if(err){
            logger.error(err);
        }else {
            logger.debug("+++++++++++"+nt.length+"++++++++++++++++++");
            res.end(JSON.stringify(nt))
        }
    })
}
exports.myCreate=function (req, res, next) {
    logger.debug("myCreat......"+JSON.stringify(req.query));
    var voteUser={};
    voteUser.openId=req.query.openid;
    logger.debug("myCreate......openId="+ voteUser.openId);
    VoteTask.getCreateVt(voteUser.openId,function (err,nt) {
        if(err){
            logger.error(err);
        }else {
            logger.debug("获取的vote数据长度为:"+nt.length)
            res.end(JSON.stringify(nt))
        }
    })
}
exports.getGIDTask=function (req, res, next) {
    logger.debug("getGIDTask......"+JSON.stringify(req.query));
    var voteTask={};
    voteTask.groupId=req.query.gid;
    VoteTask.getGIDTask(voteTask.groupId,function (err,nt) {
        if(err){
            logger.error(err);
        }else {
            logger.debug("获取的vote数据长度为:"+nt.length)
            res.end(JSON.stringify(nt))
        }
    })
}
exports.storeVoteGId=function (req, res, next) {
    logger.debug("storeVoteGId......"+JSON.stringify(req.query));
    var voteGroup={};
    voteGroup.groupId=req.query.gid;
    voteGroup.voteId=req.query.voteid;
    logger.debug("storeVoteGId......gid="+  voteGroup.groupId+";voteId="+voteGroup.voteId);
    VoteTask.storeVoteGroup(voteGroup,function (err) {
        if(err){
            logger.error(err);
        }else {
            res.end()
        }
    })
}
/*
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
}*/
