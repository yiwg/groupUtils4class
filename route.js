var express = require('express');
var router = express.Router();
var user = require('./controllers/user');
var wxUser=require('./controllers/wxuser');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("test test!!");
    logger.debug("this is a log4js test1111111111111!");
    res.render('index', { title: 'Express' });
});

//用户相关`
router.get('/user', user.index);
router.get('/application/link/forex_require_url', wxUser.forex_require_url);
router.get('/application/link/getOpenid', wxUser.getOpenid);

//群通知相关
//application/notice/getNoticeTask
//router.get('application/notice/getNoticeTask', wxUser.getNoticeTask);
module.exports = router;

