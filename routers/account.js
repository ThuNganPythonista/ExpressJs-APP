const express = require("express");
var router = express.Router();
const AccountModel = require("../models/account");

router.get("/", (req, res, next) => {
  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .cath((error) => {
      res.status(500).json("Loi server");
    });
});

module.exports = router;
