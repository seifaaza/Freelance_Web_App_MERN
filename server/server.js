// import dependencies
const express = require("express");
const connectToDB = require("./config/connectToDb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const uploadMiddleware = require('./middleware/MulterMiddleware')

//Authentication
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
app.use(express.static('public'))

// Connect to database
connectToDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

// Admins
app.get("/admins", adminController.fetchAdmins);
app.post("/admin-login", adminController.login);
app.get("/admin-check-auth",requireAdminAuth, adminController.checkAuth);
app.get("/admin-logout", adminController.logout); 
app.get("/admin/:id",  adminController.fetchAdmin);
app.post("/admin",  adminController.createAdmin);
app.put("/admin/:id",  adminController.updateAdmin);
app.delete("/admin/:id",  adminController.deleteAdmin);

app.use('/user', express.static('uploads'))
// Users
app.get("/users", userController.fetchUsers);
app.get("/user/:id", userController.fetchUser);
app.post("/signup", userController.signup);
app.put("/update-user/:id", uploadMiddleware.single("image"), userController.updateUser);
app.post("/login", userController.login);
app.get("/check-auth",requireAuth, userController.checkAuth);
app.get("/logout", userController.logout);
app.delete("/user/:id", userController.deleteUser);
app.delete("/user-account/:id", userController.deleteAcc);

app.use('/team', express.static('uploads'))
// Team
app.get("/team", teamController.fetchTeam);
app.post("/team", uploadMiddleware.single("image"), teamController.createTeam);
app.put("/team/:id", uploadMiddleware.single("image"),  teamController.updateTeam);
app.delete("/team/:id", teamController.deleteTeam);



// Start server
app.listen(process.env.PORT);
