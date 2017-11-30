var https = require('https');
var iconv = require("iconv-lite");
var cfg = require('../../cfg.js');
var log = cfg.log('weixin');
var net = require('../../net/net');

/**
 * 微信网页授权文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
 * 
 * 授权链接示例：https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2ba7c5f470b4fe86&redirect_uri=http%3A%2F%2Fweixin.36yyk.cn%2F&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect
 * 
 */

// var AUTHORIZE_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';
// var ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code';
// var REFRESH_ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN';
// var USER_INFO_URL = 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';

var APPID = 'wx2ba7c5f470b4fe86';
var APPSECRET = '722f24d1ee3844db96183533461a6ab4';

function reqHttps(url, cb) {
    log.debug('reqHttps url = ' + url);

    var req = https.get(url, function (res) {
        // console.log('状态码：', res.statusCode);
        // console.log('请求头：', res.headers);
        var datas = [];
        var size = 0;
        res.on('data', function (data) {
            // process.stdout.write(data);  
            datas.push(data);
            size += data.length;
        });
        res.on('end', function () {
            // log.info('-- end --');
            var buff = Buffer.concat(datas, size);
            var result = iconv.decode(buff, 'utf8');//转码 
            //var result = buff.toString();//不需要转编码,直接tostring  
            log.info('== end: ' + typeof (result));
            log.info(result);
            log.info('== GBK buff: ');
            log.info(iconv.decode(buff, 'gbk'));
            log.info('== https over ==');
            try {
                result = JSON.parse(result);
            } catch (error) {
                result = { errcode: -2, errmsg: 'data parse error', data: result };
            }
            cb(result);
        });
    }).on('error', function (err) {
        log.error('== reqHttps error = ');
        log.error(err.stack)
        cb({ errcode: -1, errmsg: 'get error!!' });
    });

    req.setTimeout(100000, function () {
        log.error('-- req is timeout --');
        cb({ errcode: -1, errmsg: 'req is timeout!!!' });
    });
}

exports.getAcessToken = function (code, cb) {
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token' + '?appid=' + APPID + '&secret=' + APPSECRET + '&code=' + code + '&grant_type=authorization_code';
    net.get(url, cb);
}

exports.refreshAcessToken = function (refreshToken) {
    var url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token' + '?appid=' + APPID + '&grant_type=refresh_token&refresh_token=' + refreshToken;
    net.get(url, cb);
}

exports.getUserInfo = function (openid, accessToken, cb) {
    var url = 'https://api.weixin.qq.com/sns/userinfo' + '?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN';
    net.get(url, cb);
}
