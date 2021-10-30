const express = require("express");
const router = express.Router();

const auth = require("./auth");
const users = require("./users");
const contacts = require("./contacts");

/**
 * @route  GET   /api
 */
router.get("/", (req, res) => {
  res.json({
    message: "This is a base api endpoint",
  });
});

router.use("/auth", auth);
router.use("/users", users);
router.use("/contacts", contacts);

module.exports = router;
