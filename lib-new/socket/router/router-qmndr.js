var express = require('express');
var router = express.Router();
var cfg = require('../cfg.js');
var log = cfg.log('router-qmndr');
var glob = require('glob-all');



var cmds = {};
var pathname = __dirname + '/../api/' + cfg.projName + '/**/*.js';

// 遍历对应的协议文件
var path = require('path');
var files = glob.sync(pathname);
files.forEach(function (file) {
    var extname = path.extname(file);
    var basename = path.basename(file, extname);
    cmds[basename] = require(file);
    log.debug('qmndr register api: ' + basename);
});

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    log.info('-- haha i get the /LobbyServer/ ');
    log.debug(req.path)
    var cmd = req.path.replace('/', '');
    log.debug(cmd);
    next();
});

router.all('/loginHall', function (req, res, next) {
    const body = req.method === 'POST' ? req.body : req.query;
    cmds.loginHall(body, function (rst) {
        res.json(rst);
    });
})
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);
    // router.all('/loginHall', cmds.loginHall);

module.exports = router;