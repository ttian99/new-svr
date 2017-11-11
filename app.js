// // 启动命令行文件
// var argv = require('./lib/tool/argv.js');
// // argv.pname = argv.pname || 'xwf';
// // argv.dbname = argv.dbname || 'jiaodb';
// // argv.dbtype = argv.dbtype || 'postsql'
// // argv.port = argv.port || 8010;
// // argv.dev = !!argv.dev;

// 监听process的异常
process.on('uncaughtException', function (e) {
  console.error('process Caught exception: ' + e.stack);
});
// 初始化配置文件
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('project.json'));
var cfg = require('./lib/cfg.js');
cfg.init(json);

// app日志
var log = cfg.log('app');
log.debug(JSON.stringify(cfg), 'cfg : s%');

// 初始化express 
var express = require('./lib/express/express');
var app = express.init();

// 选择路由
app.use('/', require('./lib/router/api-router.js'));

// 服务器监听 
var server = app.listen(cfg.port, function () {
  var port = server.address().port;
  log.debug('http svr is listener on port: ' + cfg.port);
});