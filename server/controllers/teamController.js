const Team = require("../models/team");
const multer = require("multer");

const fetchTeam = async (req, res) => {
  const team = await Team.find();
  res.json({ team: team });
};

const createTeam = async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const image = req.body.image;

  const password = req.body.password;
  const social = req.body.social;
  const team = await Team.create({
    fullName: fullName,
    image: image,
    email: email,
    password: password,
    social: social,
  });
  res.json({ team: team });
};



const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../../client/public/uploads/");
  },
  fileName: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../../client/public/uploads/");
//   },
//   fileName: (req, file, callback) => {
//     callback(null, file.originalName);
//   },
// });
// const upload = multer({ storage: storage });

const updateTeam = async (req, res) => {
  teamId = req.params.id;

  const fullName = req.body.fullName;
  const image = req.body.image;
  const email = req.body.email;
  const password = req.body.password;
  const social = req.body.social;

  await Team.findByIdAndUpdate(teamId, {
    fullName: fullName,
    image: image,
    email: email,
    password: password,
    social: social,
  });

  const team = await Team.findById(teamId);

  res.json({ team: team });
};

const deleteTeam = async (req, res) => {
  const teamId = req.params.id;

  await Team.findByIdAndDelete(teamId);

  res.json({ success: "record deleted" });
};

module.exports = {
  fetchTeam: fetchTeam,
  createTeam: createTeam,
  updateTeam: updateTeam,
  deleteTeam: deleteTeam,
};
