var bunyan = require('bunyan-daily');
var _ = require('lodash');

var cfg = {
    projName: 'qmndr',
    dbName: 'app',
    port: 7777,
    isDev: false,
};

cfg.init = function (data) {
    cfg._init(data);
    cfg._initLog();
};

cfg._init = function (data) {
    console.log(data);
    console.log(data.port);
    console.log(data.projName);
    cfg.port = data.port || cfg.port;
    cfg.projName = data.projName || cfg.projName;
    cfg.isDev = data.isDev || cfg.isDev;
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