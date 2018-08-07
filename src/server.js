import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

export default server;