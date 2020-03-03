'use strict';

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _connect = require("./sql/connect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");
require("babel-polyfill");
// env

_dotenv2.default.config();

// sql
var mysql = require('promise-mysql');

// server/app.js

require('./passport');
// connect sql
// const pool = require('./sql/connect');

// var pool = pool1()
// console.log(pool1())

var app = (0, _express2.default)();
var pool = _connect.connect_mysql;

// routes
var auth = require('./routes/auth');
var product = require('./routes/product');
var user = require('./routes/user');

app.use(_express2.default.json());
app.use('/api', auth);
app.use('/api/product', _passport2.default.authenticate('jwt', { session: false }), product);
app.use('/api/user', _passport2.default.authenticate('jwt', { session: false }), user);

// var jwt_secret = process.env.JWT_SECRET;

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     }, 
//     (email, password, cb) => {     
//     // console.log(email,password,cb)   
//      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT  
//     // console.log('passport')
//     // ค้นหาใน db มี email และ password ที่ตรงกันหรือเปล่า
//     let user ={
//       email : email,
//       password : password
//     }
//     return cb(null, user, {message: 'Logged In Successfully'});
//     // return UserModel.findOne({email, password})
//     //        .then(user => {
//     //            if (!user) {
//     //                return cb(null, false, {message: 'Incorrect email or password.'})
//     //            }               
//     //            return cb(null, user, {message: 'Logged In Successfully'})
//     //       })
//     //       .catch(err => cb(err))
//     }
// ));

// Server static assets
app.use(_express2.default.static(_path2.default.resolve(__dirname, '..', 'build')));

// app.post('/api/login',
//     passport.authenticate('local'), (req, res) => {
//     console.log(res)
//     // res.redirect('/users/' + req.user.username);
// });

// app.post('/api/login', (req, res, next) => passport.authenticate('local', (error, user, info) => {
//   console.log(user,error,info)
//   if (error) {
//     return next(error)
//   }
//   })(req, res, function(){
//       console.log(res)
//   })


var seletProduct = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
            return _context.abrupt("return", recentVotesQuery);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function seletProduct() {
    return _ref.apply(this, arguments);
  };
}();

app.get('*', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return seletProduct();

          case 2:
            product = _context2.sent;

            console.log(product[0].product_name);
            res.send('backend run' + product[0].product_name);

            //   seletProduct()
            //   // console.log('tet',pool1())
            // //   res.sendFile(path.resolve(__dirname, '..', 'build', '../public/index.html'));
            //     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
            //   res.sendFile(path.join(__dirname + '../public/index.html'));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());

var PORT = process.env.PORT || 80;

app.listen(PORT, function () {
  console.log("App listening on port " + PORT + "!");
});