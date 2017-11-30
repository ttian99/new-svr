var _ = require('lodash');
var cfg = require('../../cfg.js');
var log = cfg.log('login');
var wx = require('./login');

module.exports = function login(body, cb) {
	log.info('== get login body = ' + JSON.stringify(body));
	try {
		wx.getAcessToken(body.code, function (data) {
			getAccessTokenCb(data, cb);
		});
	} catch (error) {
		log.error('== catch error =' + error.stack);
		cb({ ret: -101, msg: 'login error catch {*_*}!' })
	}
}

// 获取用户信息回调
function getUserInfoCb(result, cb) {
	log.info('== getUserInfo back ==' + JSON.stringify(result));
	log.error('== errorcode = ' + result.errcode);
	if (result.errcode) {
		log.error('== getUserInfo erorr' + JSON.stringify(result));
		cb(result);
	} else {
		log.error('== getUserInfo success' + JSON.stringify(result));
		cb(_.merge({ ret: 0, msg: 'login success' }, result));
	}
}

function getAccessTokenCb(data, cb) {
	log.error('==> errorcode = ' + data.errcode);
	if (data.errcode) {
		log.info('== getAcessToken error: ' + JSON.stringify(data));
		cb({ ret: -1, msg: '**** getAcessToken error ****', errcode: data.errcode });
	} else {
		log.info('== getAccessToken data: ' + JSON.stringify(data));
		log.info('data.openid = ' + data.openid);
		log.info('data.access_token = ' + data.access_token);
		wx.getUserInfo(data.openid, data.access_token, function (result) {
			getUserInfoCb(result, cb);
		});
	}
}