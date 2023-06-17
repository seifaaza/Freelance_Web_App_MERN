const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fullName: String,
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
  image: String,
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
