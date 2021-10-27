const express = require('express');
const router = express.Router();


 /* 
  * @route    GET api/auth
  * @desc     Get logged in user
  * @access   Private
  */
router.get('/', (req, res) => {
  res.json({
    message: 'Get logged in user'
  });
});


 /* 
  * @route    POST api/auth
  * @desc     Auth user & get token
  * @acess    Public
  */
router.post('/', (req, res) => {
  res.json({
    message: 'Auth user and sent token'
  });
});



module.exports = router;