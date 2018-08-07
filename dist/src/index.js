'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = _dotenv2.default.config();

if (result.error) {
  throw result.error;
}

(0, _routes2.default)(_server2.default);

_server2.default.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT + '...');
});