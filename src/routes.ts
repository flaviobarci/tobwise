import githubEvent from './events';

const routes = (server) => {
  server.get('/', (req, res) => {
    res.sendStatus(200);
  });

  server.post('/new-message', (req, res) =>{
    console.log(req.body);
  });

  server.get('/web-hook', (req, res) => {
    res.sendStatus(200);
  });

  server.post('/web-hook', (req, res) => {
    const event = req.headers['x-github-event'];
    githubEvent.emit(event, req, res);
  });
};

export default routes;
