const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  fullName: String,
  image: String,
  email: {
    type: String,
   
  },
  linkedin: String,
  github: String,
  figma: String,
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;

