import EventEmitter from 'events';
import axios from 'axios';

const githubEvent = new EventEmitter();

const sendMessage = (req, res, message) => {
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
};

githubEvent.on('push', (req, res) => {
  console.log('Push event');
  const body = req.body;

  let commitMessages = '';
  let numberOfCommits = 0;

  body.commits.forEach((commit) => {
    commitMessages += `[${commit.id.substring(0, 7)}](${commit.url}) "${commit.message}"\n`;
    numberOfCommits++;
  });

  let message = `${body.head_commit.author.name}\n` +
    `[New Push](${body.compare}) @ [${body.repository.full_name}](${body.repository.url})\n` +
    `${numberOfCommits} commits.\n` +
    `${commitMessages}`;

  sendMessage(req, res, message);

});

githubEvent.on('issues', (req, res) => {
  console.log('Issue event');
  const body = req.body;

  const lower = body.action;
  let message = `${body.issue.user.login}\n[${lower.replace(/^\w/, c => c.toUpperCase())} Issue](${body.issue.html_url}) "${body.issue.title}"`;

  sendMessage(req, res, message);

});

githubEvent.on('pull_request', (req, res) => {
  console.log('Pull Request');

  const body = req.body;

  let message = `${body.pull_request.user.login}\n` +
    `[New Pull Request](${body.pull_request.url}) @ [${body.repository.full_name}](${body.repository.url})\n` +
    `"${body.pull_request.title}"`;

  sendMessage(req, res, message);

});

githubEvent.on('gollum', (req, res) => {
  console.log('Wiki');

  const body = req.body;

  let pageNames = '';

  body.pages.forEach((page) => {
    pageNames += `[${page.page_name}](${page.url}) ${page.action}\n`;
  });

  let message = `${body.sender.login}\n` +
    `[New Wiki Change](${body.repository.html_url}/wiki) @ [${body.repository.full_name}](${body.repository.url})\n` +
    `${pageNames}`;

  sendMessage(req, res, message);

});

export default githubEvent;