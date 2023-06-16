const Team = require("../models/team");
const multer = require("multer");

const fetchTeam = async (req, res) => {
  const team = await Team.find();
  res.json({ team: team });
};

async function createTeam(req, res) {
  try{
    const {fullName, email, image, linkedin, github, figma} = req.body;
    const team = await Team.create({fullName, email, image, linkedin, github, figma });
    res.json({ team: team })
  }
  catch(err){
    console.log(err);
    res.sendStatus(400)
  }
}

// const createTeam = async (req, res) => {
//   try{
//     const fullName = req.body.fullName;
//     const email = req.body.email;
//     const image = req.body.image;
//     const linkedin = req.body.linkedin;
//     const github = req.body.linkedin;
//     const figma = req.body.linkedin;
//     const team = await Team.create({
//       fullName: fullName,
//       image: image,
//       email: email,
//       linkedin: linkedin,
//       github: github,
//       figma: figma,
//     });
//     res.json({ team: team });
//     res.sendStatus(200);
//   }
//   catch(err) {
//     console.log(err);
//     res.sendStatus(400)
//   }
// };

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
  const linkedin = req.body.linkedin;
  const github = req.body.github;
  const figma = req.body.figma;

  await Team.findByIdAndUpdate(teamId, {
    fullName: fullName,
    image: image,
    email: email,
    linkedin: linkedin,
    github: github,
    figma: figma,
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
