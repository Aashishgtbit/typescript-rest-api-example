import * as express from "express";
import UserController from "../user/user.controller";

const router = express.Router();

var userRoutes = new UserController();
router.post("/signup", userRoutes.createUser);
router.post("/login", userRoutes.userLogin);

export default router;
