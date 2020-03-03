'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes/auth.js
var router = require('express').Router();

/* POST login. */
router.post('/login', function (req, res, next) {
    _passport2.default.authenticate('local', { session: false }, function (err, user, info) {
        if (err) return next(err);
        if (user) {
            var token = _jsonwebtoken2.default.sign(user, process.env.JWT_SECRET);
            return res.json({ user: user, token: token });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

module.exports = router;