const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

const Admins = mongoose.model("Admins", adminsSchema);
module.exports = Admins;
