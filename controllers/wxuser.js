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
  url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code"+js_code+"&grant_type="+grant_type;
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
