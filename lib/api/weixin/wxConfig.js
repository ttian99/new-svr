var _ = require('lodash');
var cfg = require('../../cfg.js');
var log = cfg.log('wxConfig');
var wx = require('./wxConfig');

// https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
module.exports = function wxConfig(body, cb) {
	log.info('== get wxConfig body = ' + JSON.stringify(body));
	try {
		
	} catch (error) {
		log.error('== catch error =' + error.stack);
		cb({ ret: -101, msg: 'wxConfig error catch {*_*}!' })
	}
}
