const express = require("express");
const { body, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs');

const User = require("../models/User");

const router = express.Router();

/*
 * @route POST api/users
 * @desc Register a user
 * @acess Public
 *
 */
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a passowrd with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, password} = req.body;

    try{
      let user = await User.findOne({email});

      if(user){
        return res.status(400).json({message: "User already exists"});
      }

      user = new User({name,email,password});
      const salt = await bcrypt.genSalt(14);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.send('User saved');
    }catch(error){
      console.error(error);
      res.status(500).json({message: "Failed to save the user information."});
    }
  }
);

module.exports = router;
