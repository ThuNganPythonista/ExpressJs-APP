const express = require("express");
var app = express();
var router1 = require("./apiRouter.js");
app.use("/api1/", router1);

app.get("/", (req, res) => {
  res.json("Home!");
});

app.listen(3001, () => {
  // listen là một method của express nó khởi động server và bắt đầu lắng nghe các kết nối port được chỉ định
  console.log("Server started on port");
});
