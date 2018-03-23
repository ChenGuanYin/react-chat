
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/react-chat');
mongoose.connection.on('connected', function () {
    console.log('服务器连接成功')
})
const models = {
    user: {
        'user': {'type': String, 'require': true},
        'password':{'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        // 头像
        'avatar': {'type': String},
        // 个人简介或者职位简介
        'desc': {'type': String},
        // 职位名
        'title': {'type': String},
        // 如果是boss，还有两个字段
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
      'chatid': {'type': String, 'require': true},
      'from': {'type': String, 'require': true},
      'to': {'type': String, 'require': true},
      'content': {'type': String, 'require': true},
      'create_time': {'type': Number, 'default': new Date().getTime()},
      'read': {'type': Boolean, 'default': false}
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}
