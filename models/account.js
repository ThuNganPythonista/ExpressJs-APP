const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ThuNganPham:Vyfjgfx8suMPCmzP@cluster0.tjb2qrj.mongodb.net/ThuNganPham?retryWrites=true&w=majority&appName=Cluster0"
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
