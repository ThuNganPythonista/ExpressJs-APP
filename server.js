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

  // console.log(username, password);
  AccountModel.findOne({
    username: username,
  })
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

app.post("/login", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  // console.log(username, password);
  AccountModel.findOne({
    username: username,
    password: password,
  })
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
        res.json("Đăng nhập thành công");
      } else {
        res.status(300).json("tai khoan khong đúng");
      }
    })
    .catch((err) => {
      res.status(500).json("Có lỗi bên server");
    });
});

var routerAccount = require("./routers/account.js");

app.use("/api/account/", routerAccount);

app.listen(3000, () => {
  console.log("Server started on port 3001");
});
