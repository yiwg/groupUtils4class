var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var user = require('./controllers/user');
var logger = log4js.getLogger();
logger.level = 'debug';

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("test test!!");
    logger.debug("this is a log4js test1111111111111!");
    res.render('index', { title: 'Express' });
});

router.get('/user', user.index);
module.exports = router;

