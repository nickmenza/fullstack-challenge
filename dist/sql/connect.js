'use strict';

Object.defineProperty(exports, "__esModule", {
       value: true
});
exports.connect_mysql = undefined;

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 'use strict';
var mysql = require('promise-mysql');


// Create a Winston logger that streams to Stackdriver Logging.
var winston = require('winston');

var _require = require('@google-cloud/logging-winston'),
    LoggingWinston = _require.LoggingWinston;

var loggingWinston = new LoggingWinston();
var logger = winston.createLogger({
       level: 'info',
       transports: [new winston.transports.Console(), loggingWinston]
});

var pool = void 0;
var createPool = function () {
       var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                     while (1) {
                            switch (_context.prev = _context.next) {
                                   case 0:
                                          _context.next = 2;
                                          return mysql.createPool({
                                                 user: process.env.DB_USER, // e.g. 'my-db-user'
                                                 password: process.env.DB_PASS, // e.g. 'my-db-password'
                                                 database: process.env.DB_NAME, // e.g. 'my-database'
                                                 socketPath: './cloudsql/' + process.env.CLOUD_SQL_CONNECTION_NAME,

                                                 connectionLimit: 5,

                                                 connectTimeout: 10000, // 10 seconds

                                                 acquireTimeout: 10000, // 10 seconds

                                                 waitForConnections: true, // Default: true

                                                 queueLimit: 0 // Default: 0
                                                 //[END_EXCLUDE]
                                          });

                                   case 2:
                                          pool = _context.sent;

                                          console.log('createPool');
                                          return _context.abrupt('return', pool);

                                   case 5:
                                   case 'end':
                                          return _context.stop();
                            }
                     }
              }, _callee, undefined);
       }));

       return function createPool() {
              return _ref.apply(this, arguments);
       };
}();

// export const pool = mysql.createPool({
//         user: process.env.DB_USER, // e.g. 'my-db-user'
//         password: process.env.DB_PASS, // e.g. 'my-db-password'
//         database: process.env.DB_NAME, // e.g. 'my-database'
//         socketPath: `./cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,

//         connectionLimit: 5,

//         connectTimeout: 10000, // 10 seconds

//         acquireTimeout: 10000, // 10 seconds

//         waitForConnections: true, // Default: true

//         queueLimit: 0, // Default: 0
//         //[END_EXCLUDE]
//       });

var connect_mysql = exports.connect_mysql = function () {
       var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                     while (1) {
                            switch (_context2.prev = _context2.next) {
                                   case 0:
                                          _context2.next = 2;
                                          return createPool();

                                   case 2:
                                          return _context2.abrupt('return', _context2.sent);

                                   case 3:
                                   case 'end':
                                          return _context2.stop();
                            }
                     }
              }, _callee2, this);
       }));

       return function connect_mysql() {
              return _ref2.apply(this, arguments);
       };
}();