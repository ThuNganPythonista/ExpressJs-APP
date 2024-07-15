var jwt = require("jsonwebtoken");
const fs = require("fs");
var token = jwt.sign({ money: "999" }, "keypair.pem");
var privateKey = fs.readFileSync("keypair.pem");
var token = jwt.sign({ foo: "bar" }, privateKey, { algorithm: "RS256" });
console.log(token);
