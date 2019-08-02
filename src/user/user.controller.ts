import * as express from "express";
import User from "./user.interface";
import userModel from "./user.model";
import "dotenv/config";
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class UserController {
  public router = express.Router();
  private user = userModel;
  private User: User;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.userLogin;
    this.createUser;
  }

  public userLogin = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const res = await this.user.find({ email: request.body.email }).exec();
      if (res.length < 1) {
        const err = new Error("Auth failed");
        return response.status(401).json({
          error: err
        });
      }
      bcrypt.compare(request.body.password, res[0].password, (err, result) => {
        if (err) {
          return response.status(401).json({
            error: " Auth failed "
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: res[0].email,
              userId: res[0]._id
            },
            process.env.SECURITY_VALUE,
            { expiresIn: "2h" }
          );
          return response.status(200).json({
            message: "Auth Successful .",
            token: token
          });
        }
      });
    } catch (err) {
      console.log(err);
      response.status(500).json({
        error: err
      });
    }
  };

  public createUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const res = await this.user.find({ email: request.body.email }).exec();
      if (res.length >= 1) {
        response.status(409).json({
          message: "Email already registered"
        });
      } else {
        bcrypt.hash(request.body.password, 10, async (err, hash) => {
          if (err) {
            response.status(500).json({
              err: err
            });
          } else {
            const newUser = new this.user({
              _id: new mongoose.Types.ObjectId(),
              email: request.body.email,
              password: hash
            });

            try {
              const savedUser = await newUser.save();
              if (savedUser) {
                response.status(201).json({
                  message: "user Created ",
                  response: savedUser
                });
              }
            } catch (err) {
              response.status(500).json({
                error: err
              });
            }
          }
        });
      }
    } catch (err) {
      response.status(500).json({
        error: err
      });
    }
  };
}

export default UserController;
