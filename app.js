// // 启动命令行文件
// var argv = require('./lib-new/tool/argv.js');
// // argv.pname = argv.pname || 'xwf';
// // argv.dbname = argv.dbname || 'jiaodb';
// // argv.dbtype = argv.dbtype || 'postsql'
// // argv.port = argv.port || 8010;
// // argv.dev = !!argv.dev;

// 初始化配置文件
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('project.json'));
var cfg = require('./lib-new/cfg.js');
cfg.init(json);

// app日志
var log = cfg.log('app');
log.debug('cfg = ' + JSON.stringify(cfg));

// 监听process的异常
process.on('uncaughtException', function (e) {
  log.error('process Caught exception: ' + e.stack);
});

/******************
 * http服务器启动
 ******************/
// 初始化express 
var express = require('./lib-new/http/express.js');
var app = express.init();

// 选择http路由
app.use('/', require('./lib-new/http/router/router-http.js'));
// http服务器监听 
var httpSvr = app.listen(cfg.httpPort, function () {
  var port = httpSvr.address().port;
  log.debug('http svr is listener on port: ' + port);
});

/*****************
 * socket服务器启动
 ******************/
var socketSvr = require('./lib-new/socket/socket.js');
socketSvr.listen(cfg.socketPort);
log.debug('socket svr is listener on port: ' + cfg.socketPort);
