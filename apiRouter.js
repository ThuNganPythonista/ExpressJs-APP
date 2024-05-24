const express = require("express");
var router = express.Router(); // biến router như 1 đường dẫn chưa được ghép vào thân chính

router.post("/", (req, res) => {
  console.log(req.body);
  res.json("Router 1 in use");
});

router.get("/product", (req, res) => {
  res.json("Router 1 with products");
});

router.get("/cart", (req, res) => {
  res.json("Router 1 with cart");
});

router.get("/:id", (req, res) => {
  res.json("Router 1 in use" + req.params.id);
});

module.exports = router;
