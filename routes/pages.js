var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/contact", (req, res) => {
  res.render("contact-us");
});

router.get("/adopt", (req, res) => {
  res.render("secondarypage");
});

module.exports = router;
