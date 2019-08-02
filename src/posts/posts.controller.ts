import * as express from "express";
import Post from "./post.interface";
import postModel from "./post.model";
import Controller from "../interfaces/controller.interface";
import PostNotFoundException from "../exceptions/PostNotFoundException";

class PostsController {
  public router = express.Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.getAllPosts;
    this.createAPost;
    this.deletePost;
    this.getPostById;
  }
  public getAllPosts = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const res = await this.post.find();
      if (res) {
        response.send(res);
      }
    } catch (err) {
      response.sendStatus(500).json({
        error: err
      });
    }
  };

  public getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    try {
      const res = await this.post.findById(id);
      if (res) {
        response.send(res);
      } else {
        const err = new Error(id);
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  };

  public modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const postData: Post = request.body;
    try {
      const res = await this.post.findByIdAndUpdate(id, postData, {
        new: true
      });
      if (res) {
        response.send(res);
      } else {
        const err = new Error(id);
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  };

  public createAPost = async (
    request: express.Request,
    response: express.Response
  ) => {
    const postData: Post = request.body;
    const createdPost = new this.post(postData);
    try {
      const savedPost = await createdPost.save();
      if (savedPost) {
        response.send(savedPost);
      }
    } catch (err) {
      response.sendStatus(500).json({
        error: err
      });
    }
  };

  public deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    try {
      const res = await this.post.findByIdAndDelete(id);
      if (res) {
        response.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default PostsController;
