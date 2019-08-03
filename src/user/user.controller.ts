import * as express from "express";
import User from "./user.interface";
import userModel from "./user.model";
import "dotenv/config";
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as httpStatus from "http-status";
import HttpException from "../exceptions/HttpException";
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
        let message: string = "Authorization failed !";
        return next(new HttpException(httpStatus.UNAUTHORIZED, message));
      }
      bcrypt.compare(request.body.password, res[0].password, (err, result) => {
        if (err) {
          let message: string = " Wrong Password ";
          return next(new HttpException(httpStatus.UNAUTHORIZED, message));
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
          let msg = {
            message: "Auth Successful .",
            token: token,
            httpStatus: httpStatus.OK
          };
          return response.status(httpStatus.OK).json(msg);
        }
      });
    } catch (err) {
      let message: string = "Authorization failed !";
      return next(new HttpException(httpStatus.UNAUTHORIZED, message));
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
        let message: string = "Email already registered";
        return next(new HttpException(httpStatus.CONFLICT, message));
      } else {
        bcrypt.hash(request.body.password, 10, async (err, hash) => {
          if (err) {
            response.send(httpStatus.INTERNAL_SERVER_ERROR);
          } else {
            const newUser = new this.user({
              _id: new mongoose.Types.ObjectId(),
              email: request.body.email,
              password: hash
            });

            try {
              const savedUser = await newUser.save();
              if (savedUser) {
                let msg = {
                  message: " User Created ",
                  response: savedUser,
                  httpStatus: httpStatus.OK
                };
                response.status(httpStatus.OK).json(msg);
              }
            } catch (err) {
              let message: string = "User not created .";
              return next(
                new HttpException(httpStatus.INTERNAL_SERVER_ERROR, message)
              );
            }
          }
        });
      }
    } catch (err) {
      let message: string = "Unable to connect !";
      return next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, message));
    }
  };
}

export default UserController;
