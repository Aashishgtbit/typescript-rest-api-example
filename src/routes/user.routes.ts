import * as express from "express";
import UserController from "../user/user.controller";

/**
 * This is used to route different type of requests .
 * @post @get @put @delete
 */

const router = express.Router();

var userRoutes = new UserController();
router.post("/signup", userRoutes.createUser);
router.post("/login", userRoutes.userLogin);

export default router;
