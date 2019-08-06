import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

/*
 * It take the error object from the HttpException class .
 * which is used to populate the error response .
 * if error object is empty
 * it will take the default value .
 */
function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).send({
    status,
    message
  });
}

export default errorMiddleware;
