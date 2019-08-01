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
  public getAllPosts = (
    request: express.Request,
    response: express.Response
  ) => {
    this.post
      .find()
      .then(posts => {
        response.send(posts);
      })
      .catch(err => {
        response.sendStatus(500).json({
          Error: err
        });
      });
  };

  public getPostById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    this.post
      .findById(id)
      .then(post => {
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      })
      .catch(err => {
        console.log("Error :", err);
      });
  };

  public modifyPost = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const postData: Post = request.body;
    this.post
      .findByIdAndUpdate(id, postData, { new: true })
      .then(post => {
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      })
      .catch(err => {
        console.log("Error : ", err);
      });
  };

  public createAPost = (
    request: express.Request,
    response: express.Response
  ) => {
    const postData: Post = request.body;
    const createdPost = new this.post(postData);
    createdPost
      .save()
      .then(savedPost => {
        console.log(savedPost);
        response.send(savedPost);
      })
      .catch(err => {
        response.sendStatus(500).json({
          Error: err
        });
      });
  };

  public deletePost = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    this.post
      .findByIdAndDelete(id)
      .then(succesResponse => {
        if (succesResponse) {
          response.send(200);
        } else {
          next(new PostNotFoundException(id));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default PostsController;
