const Users = require("../models/user");

const fetchUsers = async (req, res) => {
  const users = await Users.find();
  res.json({ users: users });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  await Users.findByIdAndDelete(userId);

  res.json({ success: "record deleted" });
};

module.exports = {
  deleteUser: deleteUser,
  fetchUsers: fetchUsers,
};
