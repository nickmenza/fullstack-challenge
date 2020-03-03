'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // 'use strict';
// require('babel-register');
// // env
// // import dotenv from 'dotenv'
// const dotenv = require('dotenv');
// dotenv.config();

// // sql
// const mysql = require('promise-mysql');

// // server/app.js
// import express from 'express';
// // const express = require('express');
// const path = require('path');
// const passport = require('passport');
// require('./passport');
// // connect sql
// // const pool = require('./sql/connect');
// // import pool from './sql/connect'

// // routes
// // const auth = require('./routes/auth')
// // const product = require('./routes/product')

// const app = express();

// // app.use(express.json())
// // app.use('/api', auth)
// // app.use('/api', passport.authenticate('jwt', {session: false}), product)

// // var jwt_secret = process.env.JWT_SECRET;

// // passport.use(new LocalStrategy({
// //         usernameField: 'email',
// //         passwordField: 'password'
// //     }, 
// //     (email, password, cb) => {     
// //     // console.log(email,password,cb)   
// //      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT  
// //     // console.log('passport')
// //     // ค้นหาใน db มี email และ password ที่ตรงกันหรือเปล่า
// //     let user ={
// //       email : email,
// //       password : password
// //     }
// //     return cb(null, user, {message: 'Logged In Successfully'});
// //     // return UserModel.findOne({email, password})
// //     //        .then(user => {
// //     //            if (!user) {
// //     //                return cb(null, false, {message: 'Incorrect email or password.'})
// //     //            }               
// //     //            return cb(null, user, {message: 'Logged In Successfully'})
// //     //       })
// //     //       .catch(err => cb(err))
// //     }
// // ));

// // Server static assets
// app.use(express.static(path.resolve(__dirname, '..', 'build')));


// // app.post('/api/login',
// //     passport.authenticate('local'), (req, res) => {
// //     console.log(res)
// //     // res.redirect('/users/' + req.user.username);
// // });

// // app.post('/api/login', (req, res, next) => passport.authenticate('local', (error, user, info) => {
// //   console.log(user,error,info)
// //   if (error) {
// //     return next(error)
// //   }
// //   })(req, res, function(){
// //       console.log(res)
// //   })


// // );
// // [START cloud_sql_mysql_mysql_create]


// const seletProduct = async () => {
//   const recentVotesQuery = await pool.query(
//     'SELECT * FROM product'
//   );

//   console.log(recentVotesQuery)

// };


// const ensureSchema = async () => {
//   // Wait for tables to be created (if they don't already exist).
//   // console.log(pool)
//   await pool.query(
//     `CREATE TABLE IF NOT EXISTS votes
//       ( vote_id SERIAL NOT NULL, time_cast timestamp NOT NULL,
//       candidate CHAR(6) NOT NULL, PRIMARY KEY (vote_id) );`
//   );
// };
// // ensureSchema();


// app.get('*', (req, res) => {
//   // seletProduct()
//   // console.log(pool)
// //   res.sendFile(path.resolve(__dirname, '..', 'build', '../public/index.html'));
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// //   res.sendFile(path.join(__dirname + '../public/index.html'));
// });


// // module.exports = app;

// const PORT = process.env.PORT || 80;

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

app.use(_express2.default.json());

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

app.listen(3000);