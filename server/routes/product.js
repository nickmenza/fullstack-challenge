// routes/user.js
const router = require('express').Router()
import {connect_mysql} from '../sql/connect'


/* GET users listing. */
router.get('/', async (req, res, next) => {
  let pool = await connect_mysql()
  let page = req.query.page - 1;
  let limit = req.query.limit;
  console.log(page,limit)
  // console.log(req)
  const count = await pool.query(
    'select count(*) as count_all from `product`'
  );
  const recentVotesQuery = await pool.query(
    'SELECT * FROM product ORDER BY id DESC limit '+page*limit+","+limit
  );
  const last_page = Math.ceil(count[0].count_all/limit)

  // console.log(recentVotesQuery)
  res.json({
    data : recentVotesQuery,
    last_page : last_page,
    current_page : req.query.page ? req.query.page : 1
  });
});

router.get('/:id', async (req, res, next) => {
  let pool = await connect_mysql()
  
  // const recentVotesQuery = await pool.query(
  //   'SELECT * FROM product'
  // );
  const recentVotesQuery = await pool.query(
    `SELECT * FROM product WHERE id = ${req.params.id} limit 1`
  );

  // console.log(recentVotesQuery)
  res.json(recentVotesQuery);
});

/* POST users listing. */
router.patch('/:id', async (req, res, next) => {
  let pool = await connect_mysql()
  const body = req.body
  // console.log(req.body)
  // console.log(pool)
  let query = `UPDATE product SET category_id = ?,product_name = ?,detail = ?,price = ? WHERE id = ?`;
  const recentVotesQuery = await pool.query(query,[body.category_id,body.product_name,body.detail,body.price,req.params.id]);
  // res.json(recentVotesQuery);
  res.send('Product has been updated');
});

router.delete('/:id', async (req, res, next) => {
  let pool = await connect_mysql()
  const body = req.body
  // console.log(req.body)
  // console.log(pool)
  let query = `DELETE FROM product WHERE id = ${req.params.id}`;
  const recentVotesQuery = await pool.query(query);
  // res.json(recentVotesQuery);
  res.send('Product has been deleted');
});

/* POST users listing. */
router.post('/', async (req, res, next) => {
  let pool = await connect_mysql()
  const body = req.body
  // console.log(req.body)
  // console.log(pool)
  const recentVotesQuery = await pool.query(
    `INSERT INTO product (id, category_id, product_name, detail,price) VALUE (null, '${body.category_id}', '${body.product_name}', '${body.detail}', ${body.price})`
  );
  // res.json(recentVotesQuery);
  res.send('Product has been created');
});


module.exports = router;