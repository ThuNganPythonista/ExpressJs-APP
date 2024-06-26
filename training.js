// var jwt = require("jsonwebtoken");
// var data = { username: "ABC" };
// var token = jwt.sign(
//   data,
//   "password1234",
//   { expiresIn: 30 },
//   function (err, data) {
//     console.log("data", data);
//   }
// );
// console.log(token);

// jwt.verify(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFCQyIsImlhdCI6MTcxODk3MTQ0OCwiZXhwIjoxNzE4OTcxNDc4fQ.bovrTMvdmjuvp1ac5_E14N9rLEpVMvcx7N0fKytEGu4",
//   "password1234"
// );

//token = header.payload.signature (tức là cái secret)
// có callback là bđb
// mỗi token có thể set expiresIn
//khi tạo ra token thì ko thể hủy được
// => cách thức jwt tạo ra và hoạt động ntn
