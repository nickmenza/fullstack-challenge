'use strict';

var _connect = require('../sql/connect');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// routes/user.js
var router = require('express').Router();


/* GET users listing. */
router.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var pool, recentVotesQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.connect_mysql)();

          case 2:
            pool = _context.sent;
            _context.next = 5;
            return pool.query('SELECT * FROM product');

          case 5:
            recentVotesQuery = _context.sent;


            console.log(recentVotesQuery);
            res.send('respond with a resource');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

/* GET user profile. */
// router.get('/product', (req, res, next) => {
//     res.send(req.user);
// });

module.exports = router;