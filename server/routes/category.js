// routes/user.js
const router = require('express').Router()
import {connect_mysql} from '../sql/connect'


/* GET users listing. */
router.get('/', async (req, res, next) => {
  let pool = await connect_mysql()
  // console.log(pool)
  const recentVotesQuery = await pool.query(
    'SELECT * FROM category'
  );
  res.json(recentVotesQuery);
});

/* POST users listing. */
router.post('/', async (req, res, next) => {
    let pool = await connect_mysql()
    // console.log(pool)
    const recentVotesQuery = await pool.query(
      'SELECT * FROM category'
    );
    res.json(recentVotesQuery);
  });

/* GET user profile. */
// router.get('/product', (req, res, next) => {
//     res.send(req.user);
// });

module.exports = router;