var express = require('express');
var router = express.Router();
var user = require('./controllers/user');
var NoticeTask=require('./controllers/noticeTask.js');
var VoteTask=require('./controllers/voteTask.js');
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

//用户相关
router.get('/user', user.index);
router.get('/application/link/forex_require_url', wxUser.forex_require_url);
router.get('/application/link/getOpenid', wxUser.getOpenid);
router.get('/application/link/wxuserDataSave', wxUser.wxuserDataSave);
//群通知相关
router.get('/application/notice/createNoticeTask', NoticeTask.createNoticeTask);
router.get('/application/notice/getNoticeTask', NoticeTask.getNoticeTask);
router.get('/application/notice/storeViewerInfor', NoticeTask.storeViewerInfor);
router.get('/application/notice/myView', NoticeTask.myView);
router.get('/application/notice/myCreate', NoticeTask.myCreate);
router.get('/application/notice/getAllViewer', NoticeTask.getAllViewer);
//群投票相关
router.get('/application/vote/createVoteTask', VoteTask.createVoteTask);
router.get('/application/vote/getVoteTask', VoteTask.getVoteTask);
router.get('/application/vote/storeVoteOne', VoteTask.storeVoteOne);
router.get('/application/vote/myJoin', VoteTask.myJoin);
module.exports = router;