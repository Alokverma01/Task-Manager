const express = require("express")
const { register, login, isAuthenticated, logOut } = require("../controllers/authController.js");

const {userAuth} = require("../middleware/userAuth.js");

const authRouter = express.Router();

authRouter.post("/register" , register);
authRouter.post("/login" , login);
authRouter.post("/logout" , logOut);
authRouter.get("/is-auth", userAuth , isAuthenticated);



module.exports = authRouter;