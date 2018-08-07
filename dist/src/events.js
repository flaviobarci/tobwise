'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMessage = new _events2.default();

sendMessage.on('push', function (req, res) {
  console.log('Push event');
  var body = req.body;

  var message = body.head_commit.author.name + '\n[New Push:](' + body.compare + ') "' + body.head_commit.message + '"';

  _axios2.default.post('https://api.telegram.org/bot' + process.env.BOT_KEY + '/sendMessage', {
    chat_id: process.env.CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  }).then(function () {
    console.log('Message posted');
    res.sendStatus(200);
  }).catch(function (err) {
    console.log('Error :', err);
    res.sendStatus(500);
  });
});

sendMessage.on('issues', function (req, res) {
  console.log('Issue event');
  var body = req.body;

  var lower = body.action;
  var message = body.issue.user.login + '\n[' + lower.replace(/^\w/, function (c) {
    return c.toUpperCase();
  }) + ' Issue](' + body.issue.html_url + ') "' + body.issue.title + '"';

  _axios2.default.post('https://api.telegram.org/bot' + process.env.BOT_KEY + '/sendMessage', {
    chat_id: process.env.CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  }).then(function () {
    console.log('Message posted');
    res.sendStatus(200);
  }).catch(function (err) {
    console.log('Error :', err);
    res.sendStatus(500);
  });
});

exports.default = sendMessage;