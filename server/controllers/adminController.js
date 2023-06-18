const Admins = require("../models/admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchAdmins = async (req, res) => {
  const admins = await Admins.find();
  res.json({ admins: admins });
};

const fetchAdmin = async (req, res) => {
  const adminID = req.params.id;
  const admin = await Admins.findById(adminID);
  res.json({ admin: admin });
};

// const fetchAdmin = async (req, res) => {
//   const admin = await Admins.findById( {_id:req.session.user_id} );
//   res.json({ admin: admin });
// };

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

async function login(req, res) {
  try {
    const {email, password} = req.body;
    const admin = await Admins.findOne({email});
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
  adminId = req.params.id;

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  await Admins.findByIdAndUpdate(adminId, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  const admin = await Admins.findById(adminId);

  res.json({ admin: admin });
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  await Admins.findByIdAndDelete(adminId);

  res.json({ success: "record deleted" });
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
