// routes/user.js
const router = require('express').Router()
import {connect_mysql} from '../sql/connect'


/* GET users listing. */
router.get('/', async (req, res, next) => {
  let pool = await connect_mysql()
  // console.log(pool)
  const recentVotesQuery = await pool.query(
    'SELECT * FROM product'
  );

  console.log(recentVotesQuery)
  res.send('respond with a resource');
});

/* GET user profile. */
// router.get('/product', (req, res, next) => {
//     res.send(req.user);
// });

module.exports = router;