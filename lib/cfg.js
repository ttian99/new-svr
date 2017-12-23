var bunyan = require('bunyan-daily');

var cfg = {
  isDev: false,
  projName: 'qmndr',
  httpPort: 6000,
  socketPort: 6001,
  dbName: 'app',
};

cfg.init = function (data) {
  cfg._init(data);
  cfg._initLog();
};

cfg._init = function (data) {
  cfg.isDev = data.isDev || cfg.isDev;
  cfg.projName = data.projName || cfg.projName;
  cfg.httpPort = data.httpPort || cfg.httpPort;
  cfg.socketPort = data.socketPort || cfg.socketPort;
  cfg.dbName = data.dbName || cfg.dbName;
};

// 
cfg._initLog = function () {
  bunyan.init({
    daily: {
      dir: '../logs/' + cfg.projName
    }
  });
  cfg.log = bunyan.logger;
};

module.exports = cfg;
