const Users = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");

const fetchUsers = async (req, res) => {
  const users = await Users.find();
  res.json({ users: users });
};

const fetchUser = async (req, res) => {
  const userId = req.params.id;
  const user = await Users.findById(userId);
  res.json({ user: user });
};

async function signup(req, res) {
  try{
    const {fullName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    const users = await Users.create({fullName, email, password: hashedPassword});
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
    const user = await Users.findOne({email});

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
}
}

function checkAuth(req, res) {
  try{
    res.sendStatus(200)
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

const updateUser = async (req, res) => {

  userId = req.params.id;

  const {fullName, email,  job, des , password, availability} = req.body;
   const image = !req.file ? "avatar"  : req.file.filename ;
  // const hashedPassword = bcrypt.hashSync(password, 8)

  const user = await Users.findByIdAndUpdate(userId, {
    fullName :fullName,
    email : email,
    image: image,
    job : job,
    des : des,
    availability : availability,
    // password: hashedPassword,
    password: password,
  });

   await Users.findById(userId);

  res.json({ user: user });
};


const deleteUser = async (req, res) => {
  const userId = req.params.id;

  await Users.findByIdAndDelete(userId);

  res.json({ success: "record deleted" });
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
};
