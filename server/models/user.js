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
  image: { type: String, default: "avatar" },
  job: String,
  availability: { type: Boolean, default: true },
  des: String,
  skills : {
    type: Array
  },

});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
