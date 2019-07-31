import App from "./app";
import * as mongoose from "mongoose";
import "dotenv/config";
import PostsController from "./posts/posts.controller";

const app = new App([new PostsController()]);

app.listen();
