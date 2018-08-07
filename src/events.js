import EventEmitter from 'events';
import axios from 'axios';

const sendMessage = new EventEmitter();

sendMessage.on('push', (req, res) => {
  console.log('Push event');
  const body = req.body;

  let message = `${body.head_commit.author.name}\n[New Push:](${body.compare}) "${body.head_commit.message}"`;

  axios
    .post(
      `https://api.telegram.org/bot${process.env.BOT_KEY}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      }
    )
    .then(() => {
      console.log('Message posted');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error :', err);
      res.sendStatus(500);
    });
});

sendMessage.on('issues', (req, res) => {
  console.log('Issue event');
  const body = req.body;

  const lower = body.action;
  let message = `${body.issue.user.login}\n[${lower.replace(/^\w/, c => c.toUpperCase())} Issue](${body.issue.html_url}) "${body.issue.title}"`;

  axios
    .post(
      `https://api.telegram.org/bot${process.env.BOT_KEY}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      }
    )
    .then(() => {
      console.log('Message posted');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error :', err);
      res.sendStatus(500);
    });
});

export default sendMessage;