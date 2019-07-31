import * as express from "express";
import Post from "./post.interface";
import postModel from "./post.model";
import Controller from "../interfaces/controller.interface";
import PostNotFoundException from "../exceptions/PostNotFoundException";

class PostsController {
  public path = "/posts";
  public router = express.Router();
  private post = postModel;
  private posts: Post[] = [
    {
      author: "Marcin",
      content: "Deori fdur ffdf",
      title: "Best Times"
    }
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.put(`${this.path}/:id`, this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.post(this.path, this.createAPost);
  }
  private getAllPosts = (
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

  private getPostById = (
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

  private modifyPost = (
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

  private createAPost = (
    request: express.Request,
    response: express.Response
  ) => {
    console.log("inside createPost/ ");
    const postData: Post = request.body;
    console.log("-------", postData);
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

  private deletePost = (
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
