const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  fullName: String,
  image: String,
  email: String,
  password: String,
  social: Array
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;

