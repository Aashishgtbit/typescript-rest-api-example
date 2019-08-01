import App from "./app";
import * as mongoose from "mongoose";
import "dotenv/config";
import PostsController from "./posts/posts.controller";
import UserController from "./user/user.controller";

const app = new App([new UserController()]);

app.listen();
