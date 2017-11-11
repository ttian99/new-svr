var express = require('express');
var cors = require('cors');
var favicon = require('serve-favicon');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var morgan = require('morgan');
// var errorHandler = require('errorhandler');

exports.init = function() {
  var app = express();
  var env = app.get('env');
  app.use(cors()); // 跨域支持
  app.use(favicon('res/favicon.ico'));
  app.use(compression()); // 开启Gzip压缩
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // if ('development' === env) {
  //   app.use(morgan('dev'));
  //   app.use(errorHandler());
  // }
  
  return app;
};