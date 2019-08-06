import * as httpStatus from "http-status";

/*
 * This class is used to handle the errors during the api calls.
 *constructor take two parameter
 *  @status : number
 *  @message : string
 *  @status - get the httpStatus code ;
 *  @message - get the error message
 */
class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
