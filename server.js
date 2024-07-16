const express = require("express");
var jwt = require("jsonwebtoken");

var app = express();
var router1 = require("./apiRouter.js");
var bodyParser = require("body-parser"); // muốn đọc được data thì phải cài body-parser
const AccountModel = require("./models/account.js");
const path = require("path"); // path này chuyên nối các đường dẫn lại với nhau
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/congkhai", express.static(path.join(__dirname, "public"))); // chỉ có folder nào được static thì folder đó mới được công khai
app.use(express.static("public"));
var session = require("express-session");

app.get("/demo-cookie", (req, res, next) => {
  var LinkFile = path.join(__dirname, "demo-cookie.html");
  res.sendFile(LinkFile);
});

app.get("/", (req, res, next) => {
  var LinkFile = path.join(__dirname, "public/index.html");
  res.sendFile(LinkFile);
});

app.get("/login", (req, res, next) => {
  var LinkFile = path.join(__dirname, "login.html");
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

  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        var token = jwt.sign({ _id: data._id }, "mk");

        return res.json({
          message: "dang nhap thanh cong ",
          token: token,
        });
      } else {
        res.status(300).json("tai khoan khong đúng");
      }
    })
    .catch((err) => {
      res.status(500).json("Có lỗi bên server");
    });
});

var routerAccount = require("./routers/account.js");

var app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat", //sessionID gửi về client là 1 token nên cần có secret key để mã hóa bảo mật
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // đường truyền phải là https lên server thì mới để true
  })
);

app.get("/demo", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

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

app.get(
  "/private",
  (req, res, next) => {
    try {
      var token = req.cookies.token;
      var result = jwt.verify(token, "mk");
      if (result) {
        next();
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  (req, res, next) => {
    res.json("welcome");
  }
);

var checkLogin = (req, res, next) => {
  try {
    var token = req.cookies.token;
    var idUser = jwt.verify(token, "mk");
    AccountModel.findOne({
      _id: idUser,
    })
      .then((data) => {
        if (data) {
          req.data = data;
          next();
        } else {
          res.json("not permission");
        }
      })
      .catch((err) => {});
  } catch (err) {
    res.json("loi token");
  }
};

app.get("/task", checkLogin, (req, res, next) => {
  console.log(req.data);
  res.json("ALL TASKS");
});

var checkStudent = (req, res, next) => {
  if (req.data.role === "teacher" || req.data.role === "manager") {
    next();
  } else {
    res.json("not permission");
  }
};

app.get("/student", checkLogin, (req, res, next) => {
  res.json("ALL STUDENTS");
});

app.get("/teacher", checkLogin, checkStudent, (req, res, next) => {
  res.json("ALL TEACHERS");
});

app.get("/logout", (res, req, next) => {
  req.session.destroy((req, res, next) => {
    res.json("ss end");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3001");
});
