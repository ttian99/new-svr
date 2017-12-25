var cfg = require('../cfg');
var log = cfg.log('socket');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  log.debug('a user is connnect');
  
  // 广播
  socket.broadcast.emit('hi');

  // 画
  socket.on('draw', function(data) {
    socket.broadcast.emit('other draw', data);
  });

  // 默认房间
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });

  // 创建房间
  socket.on('create room', function() {
    var roomNum = randomRoom();
  });
  
  // 加入房间
  socket.on('join room', function(data) {
    const roomId = data.roomId;
    // 
    socket.join(roomId);
    // 房间内发送消息
    io.to(roomId).emit('other join room');
  });

  // 离开房间
  socket.on('leave room', function(data) {

  });

  // 准备
  socket.on('ready', function(data) {

  });

  // 开始游戏
  socket.on('game start', function() {

  });

  socket.on('game end', function() {

  });

  // 消息
  socket.on('chat message', function(msg){
    log.info('chat message: ' + msg);
    io.emit('chat message', msg);
  });

  // 断开连接
  socket.on('disconnect', function () {
    log.debug('user disconnected');
  });
});

module.exports = server;
