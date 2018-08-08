import EventEmitter from 'events';
import axios from 'axios';

const sendMessage = new EventEmitter();

sendMessage.on('push', (req, res) => {
  console.log('Push event');
  const body = req.body;

  let commitMessages = "";
  let numberOfCommits = 0;

  body.commits.forEach((commit) => {
    commitMessages += `[${commit.id.substring(0, 7)}](${commit.url}) "${commit.message}"\n`;
    numberOfCommits++;
  });

  let message = `${body.head_commit.author.name}\n` +
    `[New Push](${body.compare}) @ [${body.repository.full_name}](${body.repository.url})\n` +
    `${numberOfCommits} commits.\n` +
    `${commitMessages}`;

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