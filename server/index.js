'use strict';
require("babel-core/register");
require("babel-polyfill");
// env
import dotenv from 'dotenv'
dotenv.config();

// sql
const mysql = require('promise-mysql');

// server/app.js
import express from 'express';
import path from 'path';
import passport from 'passport';
require('./passport');
// connect sql
// const pool = require('./sql/connect');
import {connect_mysql} from './sql/connect'
// var pool = pool1()
// console.log(pool1())

const app = express();
let pool = connect_mysql


// routes
const auth = require('./routes/auth')
const product = require('./routes/product')
const user = require('./routes/user')


app.use(express.json())
app.use('/api', auth)
app.use('/api/product', passport.authenticate('jwt', {session: false}), product)
app.use('/api/user', passport.authenticate('jwt', {session: false}), user)


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
app.use(express.static(path.resolve(__dirname, '..', 'build')));


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


const seletProduct = async () => {
  let pool = await connect_mysql()
  const recentVotesQuery = await pool.query(
    'SELECT * FROM product'
  );
  return recentVotesQuery;
  console.log(recentVotesQuery)
  
};

app.get('*', async(req, res) => {
    const product = await seletProduct();
    console.log(product[0].product_name)
    res.send('backend run'+product[0].product_name);

//   seletProduct()
//   // console.log('tet',pool1())
// //   res.sendFile(path.resolve(__dirname, '..', 'build', '../public/index.html'));
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//   res.sendFile(path.join(__dirname + '../public/index.html'));
});


const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

