// routes/auth.js
const router = require('express').Router();
      
import passport from 'passport';
import jwt from 'jsonwebtoken';


/* POST login. */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) return next(err)
        if(user) {
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1200m' })
            return res.json({user, token})
        } else {

            return res.status(401).json(info)
         }
    })(req, res, next);
});

module.exports = router