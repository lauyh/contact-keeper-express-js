const express = require('express');
const router = express.Router();

 /* 
  * @route GET
  */
router.get('/', (req, res) => {
  res.json({
    message: 'users'
  });
});


 /* 
  * @route POST api/users
  * @desc Register a user
  * @acess Public
  * 
  */
router.post('/', (req, res) => {
  res.json({
    message: 'Register a user'
  });
});


module.exports = router;