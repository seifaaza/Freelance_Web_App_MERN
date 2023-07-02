const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  services : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    }
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
