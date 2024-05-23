const express = require("express");
var router = express.Router(); // biến router như 1 đường dẫn chưa được ghép vào thân chính

router.get("/", (req, res) => {
  res.json("Router 1 in use");
});

router.get("/:id", (req, res) => {
  res.json("Router 1 in use" + req.params.id);
});

router.get("/product", (req, res) => {
  res.json("Router 1 with products");
});

router.get("/cart", (req, res) => {
  res.json("Router 1 with cart");
});

module.exports = router;
