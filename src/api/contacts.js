const express = require("express");
const router = express.Router();

/*
 * @route    GET api/contacts
 * @desc     Get all contacts
 * @access   Private
 */
router.get("/", (req, res) => {
  res.json({
    message: "Get all contacts",
  });
});

/*
 * @route    POST api/contacts
 * @desc     Add contact
 * @acess    Private
 */
router.post("/", (req, res) => {
  res.json({
    message: "Add contact",
  });
});

/*
 * @route    PUT api/contacts/:id
 * @desc     Update contact
 * @acess    Private
 */
router.put("/:id", (req, res) => {
  res.json({
    message: "Update contact",
  });
});

/*
 * @route    DELETE api/contact
 * @desc     Add contact
 * @acess    Private
 */
router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete contact",
  });
});

module.exports = router;
