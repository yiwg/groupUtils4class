var VoteTask         = require('../proxy/index').VoteTask;
var tools        = require('../common/tools');
var config       = require('../config');
//var EventProxy   = require('eventproxy');
var _            = require('lodash');
var request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
var WXBizDataCrypt = require('../common/WXBizDataCrypt')
logger.level = 'debug';
exports.wx_xcx=function (req, res, next) {
    logger.debug("进入wx_xcx......"+JSON.stringify(req.query));
    appid     = req.query.appid;
    sessionKey  = req.query.sessionKey;
    encryptedData=req.query.encryptedData;
    iv=req.query.iv;
    logger.debug("appid="+appid+";sessionKey="+sessionKey+";encryptedData="+encryptedData+";iv="+iv);
    try{
        var pc = new WXBizDataCrypt(appid, sessionKey)
        var data = pc.decryptData(encryptedData , iv)
        logger.debug(data);
        res.end(JSON.stringify(data))
    }catch (e){
        console.log(e);
        res.json('');
    }
}
