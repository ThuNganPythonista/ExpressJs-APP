const express = require("express");
var app = express();
var router1 = require("./apiRouter.js");
var bodyParser = require("body-parser"); // muốn đọc được data thì phải cài body-parser
const AccountModel = require("./models/account.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({ username: username })
    .then((data) => {
      if (data) {
        res.json("Tài khoản này đã tồn tại");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      if (data) {
        res.json("Tạo tài khoản thành công");
      }
    })
    .catch((err) => {
      res.status(500).json("Tạo tài khoản thất bại");
    });
});

app.use("/api1/", router1);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
