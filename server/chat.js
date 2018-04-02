const express = require('express');
const model = require('./model');

const Router = express.Router()
const Chat = model.getModel('chat');
const User = model.getModel('user');

Router.get('/getMsgList', function (req, res) {
  const userid = req.cookies.userid;
  // '$or': [{from: userid, to: userid}]
  User.find({}, function (err, userDoc) {
    const users = {};
    userDoc.forEach((item, index) => {
      users[item._id] = { name: item.user, avatar: item.avatar }
    })
    Chat.find({ '$or': [{ from: userid }, { to: userid }] }, function (err, doc) {
      if (!err) {
        res.json({ code: 0, data: { doc, users } })
      } else {
        res.json({ code: 1, msg: '请稍后再试!' })
      }
    })
  })
})
Router.post('/setReadMsg', function (req, res) {
  const to = req.cookies.userid;
  const { from } = req.body;
  Chat.update(
    { from, to },
    { '$set': { read: true } },
    { multi: true },
    function (err, doc) {
      if (err) {
        res.json({ code: 1, msg: '请稍后再试' })
      } else {
        res.json({ code: 0, num: doc.nModified })
      }
    })
})

module.exports = Router;