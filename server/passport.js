const passport = require('passport')
  , jwt = require('jsonwebtoken')
  , LocalStrategy = require('passport-local').Strategy;
import {connect_mysql} from './sql/connect'


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
    }, 
    async (email, password, cb) => {     
    // ค้นหาใน db มี email และ password ที่ตรงกันหรือเปล่า
    let user = {
      id : 0,
      email : email,
      password : password
    }
    let pool = await connect_mysql()
    let query = `SELECT * FROM user WHERE email = "${email}" AND password = "${password}" LIMIT 1`;
    const recentVotesQuery = await pool.query(query);
    console.log(recentVotesQuery,email,password)
    if(recentVotesQuery.length > 0){
        user.id = recentVotesQuery[0].id
        // console.log(Object(recentVotesQuery[0]))
        return cb(null, user, {message: 'Logged In Successfully'});
    }
    return cb(null, false, {message: 'Incorrect email or password.'})
    // return UserModel.findOne({email, password})
    //        .then(user => {
    //            if (!user) {
    //                return cb(null, false, {message: 'Incorrect email or password.'})
    //            }               
    //            return cb(null, user, {message: 'Logged In Successfully'})
    //       })
    //       .catch(err => cb(err))
    }
));


const passportJWT = require("passport-jwt"),
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT  = passportJWT.ExtractJwt
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    async (jwtPayload, cb) => {

        let pool = await connect_mysql()
        let query = `SELECT * FROM user WHERE email = "${jwtPayload.email}" AND password = "${jwtPayload.password}" LIMIT 1`;
        let userQuery = await pool.query(query);
        if(userQuery.length > 0){
            return cb(null, jwtPayload)
        }
        return cb(null);
        // console.log(jwtPayload)
     //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        
    // return UserModel.findOneById(jwtPayload.id)
    //      .then(user => {
    //          return cb(null, user);
    //      })
    //      .catch(err => {
    //          return cb(err);
    //      });
    }
));