import * as express from "express";
import * as fs from "fs";
console.log("***");

const uploadImageFiles = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    let file = await request.file;
    if (file) {
      return response.json({
        result: "file uploaded successfully",
        fileObj: file
      });
    }
  } catch (err) {
    return response.json({
      result: "file not uploaded",
      message: " err"
    });
  }
};
export { uploadImageFiles };
