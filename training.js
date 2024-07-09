var jwt = require("jsonwebtoken");
const fs = require("fs");
var token = jwt.sign({ money: "999" }, "keypair.pem");
// var privateKey = fs.readFileSync("keypair.pem");
var privateKey = fs.readFileSync("keypair.pem", { encoding: "utf-8" });
var token = jwt.sign({ foo: "bar" }, privateKey);

console.log(token);
