import express from "express";
import userControoler from "../controller/user.controoler.js";
import authMiddleware from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/register", userControoler.userRegister);
route.post("/login", userControoler.loginUser);

export default route;
