// const jwt = require("jsonwebtoken");
import * as jwt from "jsonwebtoken";

let cheAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECURITY_VALUE);
    res.locals.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};

export default cheAuth;
