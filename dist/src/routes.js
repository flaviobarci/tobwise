'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(server) {
  server.get('/', function (req, res) {
    res.sendStatus(200);
  });

  server.get('/web-hook', function (req, res) {
    res.sendStatus(200);
  });

  server.post('/web-hook', function (req, res) {
    var event = req.headers['x-github-event'];
    _events2.default.emit(event, req, res);
  });
};

exports.default = routes;