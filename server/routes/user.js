// routes/user.js
const router = require('express').Router()
import {connect_mysql} from '../sql/connect'


/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log(req.user)
  res.send(req.user);
});

/* GET user profile. */
// router.get('/product', (req, res, next) => {
//     res.send(req.user);
// });

module.exports = router;