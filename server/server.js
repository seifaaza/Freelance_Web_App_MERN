// import dependencies
const express = require("express");
const connectToDB = require("./config/connectToDb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requireAuth = require('./middleware/requireAuth')
const requireAdminAuth = require('./middleware/requireAdminAuth')


//Import models
const adminController = require("./controllers/adminController");
const userController = require("./controllers/userController");
const teamController = require("./controllers/teamController");

// Load env variables
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Create express app
const app = express();


//Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

// Connect to database
connectToDB();

// Routing

// Admins
app.get("/admins", adminController.fetchAdmins);
app.post("/admin-login", adminController.login);
app.get("/admin-check-auth",requireAdminAuth, adminController.checkAuth);
app.get("/admin-logout", adminController.logout); 
app.get("/admins/:id",  adminController.fetchAdmin);
app.post("/admins",  adminController.createAdmin);
app.put("/admins/:id",  adminController.updateAdmin);
app.delete("/admins/:id",  adminController.deleteAdmin);

// Users
app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/check-auth",requireAuth, userController.checkAuth);
app.get("/logout", userController.logout);
app.get("/users", userController.fetchUsers);
app.delete("/users/:id", userController.deleteUser);

// Team
app.get("/team", teamController.fetchTeam);
app.post("/team", teamController.createTeam);
app.put("/team/:id", teamController.updateTeam);
app.delete("/team/:id", teamController.deleteTeam);

// Start server
app.listen(process.env.PORT);
