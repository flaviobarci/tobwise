import sendMessage from './events';

const routes = (server) => {
  server.get('/', (req, res) => {
    res.sendStatus(200);
  });

  server.get('/web-hook', (req, res) => {
    res.sendStatus(200);
  });

  server.post('/web-hook', (req, res) => {
    const event = req.headers['x-github-event'];
    sendMessage.emit(event, req, res);
  });
};

export default routes;