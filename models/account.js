const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ThuNganPham:GAPivuO1ovALurJf@cluster0.tjb2qrj.mongodb.net/ThuNganPham?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected!"));
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "account",
  }
);
const AccountModel = mongoose.model("account", AccountSchema);
module.exports = AccountModel;

// TEST PHÂN TRANG API

for (let i = 0; i < 20; i++) {
  AccountModel.create({
    username: "TN_" + i,
    password: "123456",
  });
}

module.exports = AccountModel;
