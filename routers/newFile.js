const AccountModel = require("../models/account");
const { router } = require("./account");

router.post("/", (req, res, next) => {
  AccountModel.create({});
});
