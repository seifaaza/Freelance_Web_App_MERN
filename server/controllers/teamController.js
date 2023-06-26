const Team = require("../models/team");
const path = require("path");

const fetchTeam = async (req, res) => {
  const team = await Team.find();
  res.json({ team: team });
};

const createTeam = async (req, res) => {
  try {
  const image = !req.file ? "avatar"  : req.file.filename ;
  const {fullName, email, linkedin, github, figma} = req.body;
  Team.create({fullName, email, image, linkedin, github, figma })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
  }catch(err){
    console.log(err)
  }
}

const updateTeam = async (req, res) => {
  try {
    teamId = req.params.id;
  const {fullName, email, linkedin, github, figma} = req.body;
  const image = !req.file ? "avatar"  : req.file.filename ;
  await Team.findByIdAndUpdate(teamId, { fullName, image, email, linkedin, github, figma });
  const team = await Team.findById(teamId);
  res.json({ team: team });
  } catch(err) {
    console.log(err);
  }



};

const deleteTeam = async (req, res) => {
  const teamId = req.params.id;

  await Team.findByIdAndDelete(teamId);

  res.json({ success: "record deleted" });
};

module.exports = {
  fetchTeam: fetchTeam,
  createTeam :createTeam,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
};
