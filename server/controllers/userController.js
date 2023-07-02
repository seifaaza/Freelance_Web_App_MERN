const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");

const fetchUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users: users });
};

var loggedUserId 

async function signup(req, res) {
  try{
    const {fullName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    const users = await User.create({fullName, email, password: hashedPassword});
    loggedUserId = users._id
    const exp = Date.now() + 1000 * 60 * 60 * 24;
    const token = jwt.sign({sub: users._id, exp}, process.env.SECRET)
  
  res.cookie("Authorization", token, {
    expires : new Date(exp),
    httpOnly : true,
    sameSite : "lax",
    secure : process.env.NODE_ENV === 'production',
  })
  res.json({ users: users })
  
  }
  catch(err){
    console.log(err);
    res.sendStatus(400)
  }
}

async function login(req, res) {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    loggedUserId = user._id
  if(!user) return res.sendStatus(401);
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if(!passwordMatch) return res.sendStatus(401)
  
  const exp = Date.now() + 1000 * 60 * 60 * 24;
  const token = jwt.sign({sub: user._id, exp}, process.env.SECRET)
  
  res.cookie("Authorization", token, {
    expires : new Date(exp),
    httpOnly : true,
    sameSite : "lax",
    secure : process.env.NODE_ENV === 'production',
  })
  res.sendStatus(200)
}
catch(err){
  console.log(err);
  res.sendStatus(400)
}}

const fetchUser = async (req, res) => {
  const user = await User.findById(loggedUserId);
  res.json({ user: user });
};

const updateUser = async (req, res) => {
  try {
    const userId = loggedUserId;
    const {fullName, email,  job, des , password, availability} = req.body;
    
    const skills = []
    if (!Array.isArray(req.body.skills)) {req.body.skills = []}
    for(let i = 0 ; i < req.body.skills.length ; i++){
      skills.push(req.body.skills[i])
    }

    const image = !req.file ? "avatar"  : req.file.filename ;
    // const hashedPassword = bcrypt.hashSync(password, 8)
    await User.findByIdAndUpdate(userId, { fullName, email, image, job, des, availability, skills, password});
    const user = await User.findById(userId);
    res.json({ user: user });
  }catch(err) {
    console.log("Updating user failed");
    console.log(err);
  }
};

function checkAuth(req, res) {
  try{
    res.sendStatus(500)
  } catch(err){
    return res.sendStatus(400)
  }
}

function logout(req, res) {
  try{
    res.clearCookie("Authorization");
    res.sendStatus(200)
  }catch(err){
    console.log(err);
    res.sendStatus(400)
  }
}

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  res.json({ success: "record deleted" });
};

const deleteAcc = async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  res.json({ success: "account deleted" });
};

module.exports = {
  deleteUser: deleteUser,
  fetchUsers: fetchUsers,
  fetchUser: fetchUser,
  signup: signup,
  updateUser: updateUser,
  checkAuth: checkAuth,
  login: login,
  logout: logout,
  deleteAcc : deleteAcc
};


