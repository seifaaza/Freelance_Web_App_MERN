const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
  },
});

const Admins = mongoose.model("Admins", adminsSchema);
module.exports = Admins;
