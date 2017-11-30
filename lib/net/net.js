var fetch = require('node-fetch');
var cfg = require('../cfg.js');
var log = cfg.log('net');

var net = {};

/**
 * @method get get请求
 * @param {String} url 请求地址
 * @param {Function} cb 请求回调地址
 */
net.get = function (url, cb) {
    log.debug("net.get req: " + url);
    fetch(url)
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            log.debug("net.get res: " + JSON.stringify(json));
            cb && cb(null, json);
        }).catch(function (err) {
            log.error('net.get error: ' + err);
            cb && cb(err, res);
        });
}

/**
 * @method post post请求
 * @param {String} url 请求地址 
 * @param {String} bodyStr 请求参数地址
 * @param {Function} cb 请求回调函数
 */
net.post = function (url, bodyStr, cb) {
    log.debug("net.post req: " + url);
    fetch(url, { method: 'POST', body: bodyStr })
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            log.debug("net.post res: " + JSON.stringify(json));
            cb && cb(null, json);
        }).catch(function (err) {
            log.error('net.post error: ' + err);
            cb && cb(err, res)
        });
}


/**
 {
    method: 'GET'
    , headers: {}        // request header. format {a:'1'} or {b:['1','2','3']}
    , redirect: 'follow' // set to `manual` to extract redirect headers, `error` to reject redirect
    , follow: 20         // maximum redirect count. 0 to not follow redirect
    , timeout: 0         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
    , compress: true     // support gzip/deflate content encoding. false to disable
    , size: 0            // maximum response body size in bytes. 0 to disable
    , body: empty        // request body. can be a string, buffer, readable stream
    , agent: null        // http.Agent instance, allows custom proxy, certificate etc.
}
 */

module.exports = net;