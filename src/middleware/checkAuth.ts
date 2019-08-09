// const jwt = require("jsonwebtoken");
import * as jwt from "jsonwebtoken";
import * as express from "express";
import { stringify } from "querystring";

let checkAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    const decoded: string | object = jwt.verify(
      token,
      process.env.SECURITY_VALUE
    );
    res.locals.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};

export default checkAuth;
