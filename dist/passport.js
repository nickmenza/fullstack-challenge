'use strict';

var _connect = require('./sql/connect');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    LocalStrategy = require('passport-local').Strategy;


// // Set the configuration for your app
//   // TODO: Replace with your project's config object
//   var config = {
//     apiKey: "apiKey",
//     authDomain: "projectId.firebaseapp.com",
//     databaseURL: "https://databaseName.firebaseio.com",
//     storageBucket: "bucket.appspot.com"
//   };
//   firebase.initializeApp(config);

//   // Get a reference to the database service
//   var database = firebase.database();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password, cb) {
        var user, pool, query, recentVotesQuery;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // ค้นหาใน db มี email และ password ที่ตรงกันหรือเปล่า
                        user = {
                            id: 0,
                            email: email,
                            password: password
                        };
                        _context.next = 3;
                        return (0, _connect.connect_mysql)();

                    case 3:
                        pool = _context.sent;
                        query = 'SELECT * FROM user WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
                        _context.next = 7;
                        return pool.query(query);

                    case 7:
                        recentVotesQuery = _context.sent;

                        console.log(recentVotesQuery, email, password);

                        if (!(recentVotesQuery.length > 0)) {
                            _context.next = 12;
                            break;
                        }

                        user.id = recentVotesQuery[0].id;
                        // console.log(Object(recentVotesQuery[0]))
                        return _context.abrupt('return', cb(null, user, { message: 'Logged In Successfully' }));

                    case 12:
                        return _context.abrupt('return', cb(null, false, { message: 'Incorrect email or password.' }));

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}())
// return UserModel.findOne({email, password})
//        .then(user => {
//            if (!user) {
//                return cb(null, false, {message: 'Incorrect email or password.'})
//            }               
//            return cb(null, user, {message: 'Logged In Successfully'})
//       })
//       .catch(err => cb(err))
);

var passportJWT = require("passport-jwt"),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(jwtPayload, cb) {
        var pool, query, userQuery;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _connect.connect_mysql)();

                    case 2:
                        pool = _context2.sent;
                        query = 'SELECT * FROM user WHERE email = "' + jwtPayload.email + '" AND password = "' + jwtPayload.password + '" LIMIT 1';
                        _context2.next = 6;
                        return pool.query(query);

                    case 6:
                        userQuery = _context2.sent;

                        if (!(userQuery.length > 0)) {
                            _context2.next = 9;
                            break;
                        }

                        return _context2.abrupt('return', cb(null, jwtPayload));

                    case 9:
                        return _context2.abrupt('return', cb(null));

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}())
// console.log(jwtPayload)
//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

// return UserModel.findOneById(jwtPayload.id)
//      .then(user => {
//          return cb(null, user);
//      })
//      .catch(err => {
//          return cb(err);
//      });
);