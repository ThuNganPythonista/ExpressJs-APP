const express = require("express");
var router = express.Router();
const AccountModel = require("../models/account");

router.get("/user", (req, res, next) => {
  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json("Loi server");
    });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  AccountModel.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
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

router.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var newPassword = req.body.newPassword;
  AccountModel.findByIdAndUpdate(id, {
    password: newPassword,
  })
    .then((data) => {
      res.json("update thanh cong");
    })
    .catch((err) => {
      res.status(500).json("loi server");
    });
});

router.delete("/:id", (req, res, next) => {
  var id = req.params.id;
  AccountModel.deleteOne({
    _id: id,
  })
    .then((data) => {
      res.json("xoa thanh cong");
    })
    .catch((err) => {
      res.status(500).json("loi server");
    });
});

module.exports = router;
