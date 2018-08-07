import server from './server';
import routes from './routes';
import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

routes(server);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});