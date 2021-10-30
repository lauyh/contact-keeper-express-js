const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");
const {isAuth} = require("../middlewares");


const router = express.Router();
/**
 * @route    GET api/contacts
 * @desc     Get all contacts
 * @access   Private
 */
router.get("/", isAuth, async(req, res) => {
  try{
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.json(contacts);
  }catch(error){
    console.error(error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
});

/**
 * @route    POST api/contacts
 * @desc     Add contact
 * @acess    Private
 */
router.post("/", [isAuth, [body("name", "Name is required").not().isEmpty()]], async(req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone, type} = req.body;

    try{
      const newContact = new Contact({name, email, phone, type, user: req.user.id});
      const contact = await newContact.save();
      res.json(contact);
    }catch(error){
      console.error(error.message);
      return res.status(500).json({message: "Internal Server Error"});
    }
});

/**
 * @route    PUT api/contacts/:id
 * @desc     Update contact
 * @acess    Private
 */
router.put("/:id", isAuth, async(req, res) => {
  const {name, email, phone, type} = req.body;

  // build contact object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try{
    let contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({message: "Contact Not Found..."});
    // check the user own the contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({message: "Access Denied..."});
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true}); 
    res.status(201).json(contact);
  }catch(error){
    console.error(error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
});

/**
 * @route    DELETE api/contact
 * @desc     Add contact
 * @acess    Private
 */
router.delete("/:id", isAuth, async(req, res) => {
  try{
    let contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({message: "Contact Not Found..."});
    // check the user own the contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({message: "Access Denied..."});
    }
    await Contact.findByIdAndRemove(req.params.id); 
    res.json({message: "Contact removed..."});
  }catch(error){
    console.error(error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
});

module.exports = router;
