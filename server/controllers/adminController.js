const Admins = require("../models/admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchAdmins = async (req, res) => {
  try{
    const admins = await Admins.find();
    res.json({ admins: admins });
  }catch(err){
    console.log("fetching admins failed");
  }
};

const createAdmin = async (req, res) => {
  try{
    const {firstName, lastName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    const admins = await Admins.create({firstName, lastName, email, password: hashedPassword});
    res.json({ admins: admins })
  }
  catch(err){
    console.log(err);
    res.sendStatus(400)
  }
};

var loggedAdminId 

async function login(req, res) {
  try {
    const {email, password} = req.body;
    const admin = await Admins.findOne({email});
    loggedAdminId = admin._id
  if(!admin) return res.sendStatus(401);
  const passwordMatch = bcrypt.compareSync(password, admin.password);
  if(!passwordMatch) return res.sendStatus(401)

  const exp = Date.now() + 1000 * 60 * 60 * 24;
  const token = jwt.sign({sub: admin._id, exp}, process.env.SECRET)

  res.cookie("AdminAuthorization", token, {
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

const fetchAdmin = async (req, res) => {
  try{
    const adminID = req.params.id;
    const admin = await Admins.findById(loggedAdminId);
    res.json({ admin: admin });
  }catch(err) {
    console.log("fetching admin failed");
  }
};

function checkAuth(req, res) {
  try{
    res.sendStatus(200)
  } catch(err){
    return res.sendStatus(400)
  }
}

function logout(req, res) {
  try{
    res.clearCookie("AdminAuthorization");
    res.sendStatus(200)
  }catch(err){
    console.log(err);
    res.sendStatus(400)
  }
}

const updateAdmin = async (req, res) => {
  try{
    adminId = req.params.id;
    const {firstName, lastName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    await Admins.findByIdAndUpdate(adminId, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });
  const admin = await Admins.findById(adminId);
  res.json({ admin: admin });
}catch(err){
  console.log("Updating admin failed");
}
};

const deleteAdmin = async (req, res) => {
  try{
    const adminId = req.params.id;
    await Admins.findByIdAndDelete(adminId);
    res.json({ success: "record deleted" });
  }catch(err) {
    console.log("Deleting admin failed");
  }
};

module.exports = {
  fetchAdmins: fetchAdmins,
  fetchAdmin: fetchAdmin,
  createAdmin: createAdmin,
  login: login,
  checkAuth : checkAuth,
  logout: logout,
  updateAdmin: updateAdmin,
  deleteAdmin: deleteAdmin,
};
