// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var io = require('socket.io');

io.set('heartbeat interval', 20);  
io.set('heartbeat timeout', 25);  
io.configure('production', function () {  
    io.enable('browser client etag');  
    io.set('log level', 0);  
    io.set('transports', ['websocket', 'jsonp-polling', 'xhr-polling', 'htmlfile']);  
});  
  
io.configure('development', function () {  
    io.set('transports', ['websocket', 'jsonp-polling', 'xhr-polling', 'htmlfile']);  
}); 

exports.init = function (port) {
  // 提示： io(<port>) 会自动创建 http 服务器
  io(port);

  io.on('connection', function (socket) {
    console.log('a user connected');
    // socket.broadcast.emit('hi');

    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
      io.emit('chat message', msg);
    });

    socket.on('close', function() {
      console.log('close')
    });

  });

  // http.listen(port, function () {
  //   console.log('socket listening on *: ' + port);
  // });
}
