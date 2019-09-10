import * as express from "express";
import * as httpStatus from "http-status";
import Post from "./post.interface";
import postModel from "./post.model";
import HttpException from "../exceptions/HttpException";

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
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {

      console.log("get all post called .")
      const res = await this.post.find();
      //check if the res Array is empty
      if (res.length == 0) {
        console.log("post has no data .");
        let msg = {
          message: "There is no posts yet . Write your post .",
          data: res,
          httpStatus: httpStatus.OK
        };
        return response.status(httpStatus.OK).json(msg);
      }
      if (res.length > 0) {
        console.log("Post has data ");
        let msg = {
          message: " Post fetched Successfully",
          data: res,
          httpStatus: httpStatus.OK
        };
        response.status(httpStatus.OK).json(msg);
      }
    } catch (err) {
      let message: string = "Error while fetching Posts .";
      return next(new HttpException(httpStatus.NOT_FOUND, message));
    }
  };

  public getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    console.log("*********");
    const id = request.query.id;
    console.log(id);
    try {
      const res = await this.post.findById(id);
      if (res) {
        let msg = {
          message: "Post fetched successfully ",
          data: res,
          httpStatus: httpStatus.OK
        };
        response.status(httpStatus.OK).json(msg);
      } else {
        let message: string = "Post not found .";
        return next(new HttpException(httpStatus.NOT_FOUND, message));
      }
    } catch (err) {
      let message: string = "Post not found .";
      return next(new HttpException(httpStatus.NOT_FOUND, message));
    }
  };

  public modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.query.id;
    const postData: Post = request.body;
    try {
      const res = await this.post.findByIdAndUpdate(id, postData, {
        new: true
      });
      if (res) {
        let msg = {
          message: "Post Updated Successfully",
          httpStatus: httpStatus.OK
        };
        response.status(httpStatus.OK).json(msg);
      } else {
        const err = new Error(id);
        throw err;
      }
    } catch (err) {
      let message: string = "Post update failed .";
      return next(new HttpException(httpStatus.FORBIDDEN, message));
    }
  };

  public createAPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const postData: Post = request.body;
    const createdPost = new this.post(postData);
    try {
      const savedPost = await createdPost.save();
      if (savedPost) {
        let msg = {
          message: "Post saved to database",
          data: savedPost,
          httpStatus: httpStatus.OK
        };
        response.status(httpStatus.OK).json(msg);
      }
    } catch (err) {
      let message: string = " server Error something went wrong . ";
      return next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, message));
    }
  };

  public deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.query.id;
    try {
      const res = await this.post.findByIdAndDelete(id);
      if (res) {
        let msg = {
          message: "Post deleted Successfully .",
          httpStatus: httpStatus.OK
        };
        response.status(httpStatus.OK).json(msg);
      }
    } catch (err) {
      let message: string = "Post not deleted try again .";
      return next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, message));
    }
  };
}

export default PostsController;
