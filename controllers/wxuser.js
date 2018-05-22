var WxUser         = require('../proxy/index').WxUser;
var tools        = require('../common/tools');
var config       = require('../config');
//var EventProxy   = require('eventproxy');
var _            = require('lodash');
var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

exports.forex_require_url=function (req, res, next) {
  logger.debug("进入forex_require_url......"+JSON.stringify(req.body));
  var appid=req.query.appid;
  logger.debug("appid="+appid);
  var secret=req.query.secret;
  logger.debug("secret="+secret);
  var js_code=req.query.js_code;
  logger.debug("js_code="+js_code);
  grant_type=req.query.grant_type;
  logger.debug("grant_type="+grant_type);
  url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type="+grant_type;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jsBody = JSON.parse(body);
      jsBody.status = 100;
      jsBody.msg = '操作成功';
      logger.debug(JSON.stringify(jsBody));
      var openid="123";//jsBody.openid;
      logger.debug("openid="+openid)

      WxUser.getUsersByOpenid(openid,function (err,wxUser) {
        logger.debug("wxUser="+wxUser);
        if(wxUser==null||wxUser==undefined||wxUser==""){
          logger.debug("openId不存在，新建wxUser");
          WxUser.newAndSave(openid, appid, "", "", "", "","","","","","","","","", function (err) {
            if(err){
              logger.error("保持微信用户失败！");
            }
          })
        }
        else {
          logger.info("微信用户已存在！");
        }
      })
      res.end(JSON.stringify(jsBody));
    }
  })
}

exports.getOpenid=function (req, res, next) {
  logger.debug("进入getOpenid......"+JSON.stringify(req.body));
  var appid=req.query.appid;
  var secret=req.query.secret;
  var js_code=req.query.js_code;
  grant_type=req.query.grant_type;
  url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type="+grant_type;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jsBody = JSON.parse(body);
      jsBody.status = 100;
      jsBody.msg = '操作成功';
      logger.debug(JSON.stringify(jsBody));
      res.end(JSON.stringify(jsBody));
    }
  })
}

exports.wxuserDataSave=function (req, res, next) {
  logger.debug("进入wxuserDataSave......req:"+JSON.stringify(req.body));
  var wxuser={};
  wxuser.openid=req.query.openid;
  logger.debug("openid="+wxuser.openid);
  wxuser.avatarUrl=req.query.avatarUrl;
  logger.debug("openid="+wxuser.avatarUrl);
  wxuser.city=req.query.city;
  wxuser.language=req.query.language;
  wxuser.nickName=req.query.nickName;
  wxuser.province=req.query.province;
  wxuser.time=req.query.time;
  WxUser.updateUserInfo(wxuser,function (err) {
    logger.debug("进入updateUserInfo......")
      if(err){
        logger.error(err);
      }
  })
}