const Admins = require("../models/admin");

const fetchAdmins = async (req, res) => {
  const admins = await Admins.find();
  res.json({ admins: admins });
};

const fetchAdmin = async (req, res) => {
  const adminID = req.params.id;
  const admin = await Admins.findById(adminID);
  res.json({ admin: admin });
};

const createAdmin = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const admins = await Admins.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  res.json({ admins: admins });
};

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
  updateAdmin: updateAdmin,
  deleteAdmin: deleteAdmin,
};
