const express = require("express");
var app = express();
var router1 = require("./apiRouter.js");
var bodyParser = require("body-parser"); // muốn đọc được data thì phải cài body-parser
const AccountModel = require("./models/account.js");
const path = require("path"); // path này chuyên nối các đường dẫn lại với nhau

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/congkhai", express.static(path.join(__dirname, "public"))); // chỉ có folder nào được static thì folder đó mới được công khai
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  var LinkFile = path.join(__dirname, "public/index.html");
  res.sendFile(LinkFile);
});

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
var PAGE_SIZE = 2;

app.use(function (req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.get("/user", (req, res, next) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    var Boqua = (page - 1) * PAGE_SIZE;
    AccountModel.find({})
      .skip(Boqua)
      .limit(PAGE_SIZE)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json("Loi server");
      });
  } else {
    AccountModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json("Loi server");
      });
  }
});

app.listen(4000, () => {
  console.log("Server started on port 3001");
});
