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

router.post("/", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.create({
    username: username,
    password: password,
  })
    .then((data) => {
      res.json("them account thanh cong");
    })
    .catch((err) => {
      res.status(500).json("Loi server");
    });
});

module.exports = router;
