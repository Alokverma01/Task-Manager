const express = require("express");

const { userAuth } = require("../middleware/userAuth.js");
const { getUserData, createTodo, getTodos, isCompleted } = require("../controllers/userController.js");


const userRouter = express.Router();

userRouter.get("/data" , userAuth ,  getUserData);
userRouter.post("/create-todo" , userAuth,  createTodo);
userRouter.get("/your-todos" , userAuth, getTodos);
userRouter.put("/update-todo" , userAuth, isCompleted)

module.exports = userRouter;