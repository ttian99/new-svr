var express = require('express');
var router = express.Router();
var cfg = require('../../cfg.js');
var log = cfg.log('router-http');

var routerMiddle;
if (cfg.projName === 'weixin') {
  routerMiddle = require('./router-weixin');
} else {
  routerMiddle = require('./router-default');
}
// router.use('/', routerMiddle);
module.exports = routerMiddle
