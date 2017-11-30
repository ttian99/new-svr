var accesstoken = '';
var expiresIn = 0;

// js-sdk的token
exports.getJsapiTicketToken = function () {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET';
}
// js-sdk的ticket
exports.getJsapiTicket = function (accessToken) {
    var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi'
}
