import * as express from "express";
import User from "./user.interface";
import userModel from "./user.model";
import Controller from "../interfaces/controller.interface";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import ErrorMiddleWare from "../middleware/error.middleware";
import HttpException from "../exceptions/HttpException";

import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class UserController {
  public path = "/user";
  public router = express.Router();
  private user = userModel;
  private User: User;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    console.log("path  : ", this.path);
    this.router.post(`${this.path}/login`, this.userLogin);
    // this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.post(`${this.path}/signup`, this.createUser);
  }

  private userLogin = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    this.user
      .find({ email: request.body.email })
      .exec()
      .then(result => {
        if (result.length < 1) {
          return response.status(401).json({
            error: "Auth Failed"
          });
        }
        bcrypt.compare(
          request.body.password,
          result[0].password,
          (err, res) => {
            if (err) {
              return response.status(401).json({
                error: "Auth failed ."
              });
            }
            if (res) {
              const token = jwt.sign(
                {
                  email: result[0].email,
                  userId: result[0]._id
                },
                "MySecretKey",
                { expiresIn: "2h" }
              );
              return response.status(200).json({
                message: "Auth Successful .",
                token: token
              });
            }
            response.status(401).json({
              Error: "Auth Failed"
            });
          }
        );
      })
      .catch(err => {
        response.status(500).json({
          Error: err
        });
      });
  };

  private createUser = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    this.user
      .find({ email: request.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          response.status(409).json({
            message: "Email already registered ."
          });
        } else {
          bcrypt.hash(request.body.password, 10, (err, hash) => {
            if (err) {
              response.status(500).json({
                error: err
              });
            } else {
              const newUser = new this.user({
                _id: new mongoose.Types.ObjectId(),
                email: request.body.email,
                password: hash
              });
              newUser
                .save()
                .then(result => {
                  console.log(result);
                  response.status(201).json({
                    message: "User Created ",
                    response: result
                  });
                })
                .catch(err => {
                  response.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  };
}

export default UserController;
