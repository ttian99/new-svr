var https = require('https');
var iconv = require("iconv-lite");
var _ = require('lodash');
var cfg = require('../../cfg.js');
var log = cfg.log('login');

var APPID = 'wx2ba7c5f470b4fe86';
var APPSECRET = '722f24d1ee3844db96183533461a6ab4';

/**
 * 微信网页授权文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
 * 
 */
var AUTHORIZE_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize';
var ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code';
var REFRESH_ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN';
var USER_INFO_URL = 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';
// var AUTHORIZE_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';
// var ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code';
// var REFRESH_ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN';
// var USER_INFO_URL = 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';

module.exports = function login(body, cb) {
	// cb({ ret: 200, msg: 'login success' });
	log.info('== get login body = ' + JSON.stringify(body));
	log.info('body.code = ' + body.code);
	getAcessToken(body.code, function (data) {
		log.error('==> errorcode = ' + data.errcode);
		if (data.errcode) {
			log.info('== getAcessToken error: ' + JSON.stringify(data));
			cb({ ret: -1, msg: '**** getAcessToken error ****', errcode: data.errcode });
		} else {
			log.info('== getAccessToken data: ' + JSON.stringify(json));
			log.info('data.openid = ' + data.openid);
			log.info('data.access_token = ' + data.access_token);
			getUserInfo(data.openid, data.access_token, function (result) {
				log.info('== getUserInfo back ==' + JSON.stringify(result));
				log.error('==> errorcode = ' + result.errcode);
				if (result.errcode) {
					log.error('== getUserInfo erorr' + JSON.stringify(result));
					cb(result);
				} else {
					log.error('== getUserInfo success' + JSON.stringify(result));
					cb(_.merge({ ret: 0, msg: 'login success' }, result));
				}
			})
		}
	});
}

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
		res.on("end", function () {
			// log.info('-- end --');
			var buff = Buffer.concat(datas, size);
			var result = iconv.decode(buff, "utf8");//转码 
			//var result = buff.toString();//不需要转编码,直接tostring  
			// log.info(result);
			try {
				result = JSON.parse(data);
			} catch (error) {
				result = { errcode: 2112, errmsg: 'data parse error', data: result };
			}
			cb(result);
		});
	}).on("error", function (err) {
		log.error('== reqHttps error = ');
		log.error(err.stack)
		cb({ errcode: -1, errmsg: 'get error!!' });
	});

	req.setTimeout(100000, function () {
		log.error('-- req is timeout --');
		cb({ errcode: -1, errmsg: 'req is timeout!!!' });
	});
}

function getAcessToken(code, cb) {
	var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID + "&secret=" + APPSECRET + "&code=" + code + "&grant_type=authorization_code";
	reqHttps(url, cb);
}

function refreshAccessToken(refreshToken) {
	var url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + APPID + '&grant_type=refresh_token&refresh_token=' + refreshToken;
}

function getUserInfo(openid, accessToken, cb) {
	var url = AUTHORIZE_URL + '?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN';
	reqHttps(url, cb);
}
