import * as express from "express";
import PostController from "../posts/posts.controller";

/**
 * This is used to route different type of requests .
 * @post @get @put @delete
 */
const router = express.Router();
var postRoutes = new PostController();
router.post("/", postRoutes.createAPost);
router.get("/", postRoutes.getAllPosts);
router.put("/:id", postRoutes.modifyPost);
router.delete("/:id", postRoutes.deletePost);
router.get("/postwithid", postRoutes.getPostById);

export default router;
