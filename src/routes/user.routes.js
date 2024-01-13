import express, { Router } from "express"
import { userRegister,login,getCurrentUser, logoutUser } from "../controller/user.controller.js";
import { validateToken } from "../middlewares/validate.js";

const userRouter= express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(validateToken,logoutUser);
userRouter.route("/current-user").get(validateToken,getCurrentUser);

export {userRouter}