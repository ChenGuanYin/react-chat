const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();
// socker.io 和 express配合
const server = require('http').Server(app);
const io = require('socket.io')(server);

const model = require('./model');
const Chat = model.getModel('chat');

io.on('connection', function (socket) {
  console.log('socket.io已连接');
  socket.on('sendMsg', function (data) {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit('recvMsg', doc);
    })
  })
})
const userRouter = require('./user');
const chatRouter = require('./chat');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/chat', chatRouter);

server.listen(6063, () => {
  console.log('服务器启动')
})