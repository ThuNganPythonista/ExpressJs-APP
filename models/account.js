const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/K5_Nodemy");
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
