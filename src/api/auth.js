const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../models/User");


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
router.post('/', [
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a passowrd with 6 or more characters"
    ).exists(),
  ], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({message: "Invalid Credentials..."});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(400).json({message: "Invalid Credentials..."});
      }

      const payload = {
        user: {
          id: user.id,
        }
      };

      jwt.sign(payload, config.get('jwtSecret'),{
        expiresIn: 3600,
      }, (err, token)=>{
        if(err) throw err;
        res.status(200).json({token});
      })
    }catch(err){
      console.error(err.message);
      res.status(500).json({message: "Failed to retrieve the user information."});
    }
});



module.exports = router;