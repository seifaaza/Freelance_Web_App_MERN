const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
});

// usersSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(10)
//   const hashed = await bcrypt.hash(this.password, salt)
//   this.password = hashed
//   next();
// })

// usersSchema.methods.genAuthToken = function () {
//   return jwt.sign(this.toJSON(), 'ThePassword')
// };

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
