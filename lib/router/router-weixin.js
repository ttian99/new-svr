var express = require('express');
var router = express.Router();
var cfg = require('../cfg.js');
var log = cfg.log('router-weixin');

var cmd = {};
cmd.login = require('../api/weixin/login');
cmd.wxConfig = require('../api/weixin/wxConfig');
router.all('/', function (req, res, next) {
    log.info('req.path = ' + req.path);
    const body = req.method === 'POST' ? req.body : req.query;
    login(body, function (rst) {
        res.json(rst);
    });
});

module.exports = router;