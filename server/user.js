const express = require('express');
const utils = require('utility');
const model = require('./model.js');

const Router = express.Router();
const User = model.getModel('user');
const __filter = { 'password': 0, '__v': 0 }
// 列表接口
Router.get('/list', function (req, res) {
  const { type } = req.query
  User.find({ type }, __filter, function (err, doc) {
    if (!err) {
      if(doc.length > 0) {
        return res.json({code: 0, data: doc})
      }else {
        return res.json({code: 1, msg: '暂无牛人信息'})
      }
    }else {
      return res.json({ code: 1, msg: '请稍后再试' })
    }
  })
})
// 注册接口
Router.post('/register', function (req, res) {
  const { user, password, type } = req.body;
  User.findOne({ user }, function (err, doc) {
    if (!err) {
      if (doc) {
        return res.json({ code: 1, msg: '用户名已存在' })
      }
      var userModel = new User({ user, type, password: md5Pwd(password) });
      userModel.save(function (err, doc) {
        if (err) {
          return res.json({ code: 1, msg: '注册失败，请稍后再试' })
        } else {
          res.cookie('userid', doc.id);
          const { user, type, _id } = doc;
          return res.json({ code: 0, data: { user, type, _id } });
        }
      })
    }
  })
})
// 登陆接口
Router.post('/login', function (req, res) {
  const { user, password } = req.body;
  // findOne，第二个参数可以控制不显示
  User.findOne({ user, password: md5Pwd(password) }, __filter, function (err, doc) {
    if (!err) {
      if (!doc) {
        return res.json({ code: 1, msg: '用户名或密码不正确!' })
      } else {
        res.cookie('userid', doc.id);
        return res.json({ code: 0, data: doc })
      }
    }
  })
})
// 查询信息接口
Router.get('/info', function (req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  } else {
    User.findOne({ '_id': userid }, __filter, function (err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '请稍后再试' })
      } else if (doc) {
        return res.json({ code: 0, data: doc })
      }
    })
  }
})
// 更新接口
Router.post('/update', function (req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  } else {
    const body = req.body;
    console.log(body);
    User.findByIdAndUpdate(userid, body, function (err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '请稍后再试' })
      }
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body);
      return res.json({ code: 0, data })
    })
  }
})
// 常用加密密码
function md5Pwd(pwd) {
  const str = 'react-chat!#@com';
  return utils.md5(utils.md5(pwd + str));
}

module.exports = Router;