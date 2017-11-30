var express = require('express');
var router = express.Router();

var routerFile = require('./router-default');
if (cfg.projName === 'weixin') {
  routerFile = require('./router-weixin')
}

routerFile.use('/', routerFile);

module.exports = router;