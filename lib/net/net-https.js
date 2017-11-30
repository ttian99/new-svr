var http = require('https');
var httpsObj = {};

httpsObj.get = function() {
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
            var buff = Buffer.concat(datas, size);
            var result = iconv.decode(buff, 'utf8');//转码 
            //var result = buff.toString();//不需要转编码,直接tostring  
            try {
                result = JSON.parse(result);
                cb(result);
            } catch (error) {
                result = { errcode: -2, errmsg: 'data parse error', data: result };
                cb(result);
            }
        });
    }).on('error', function (err) {
        log.error('==> reqHttps error ==');
        log.error(err.stack)
        cb({ errcode: -1, errmsg: 'get error!!' });
    });

    req.setTimeout(100000, function () {
        log.error('==> req is timeout ==');
        cb({ errcode: -1, errmsg: 'req is timeout!!!' });
    });
}

module.exports = httpsObj;