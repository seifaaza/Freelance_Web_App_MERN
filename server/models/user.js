const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: String,
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
