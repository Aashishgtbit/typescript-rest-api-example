import * as express from "express";
import * as multer from "multer";
let storage: multer.StorageEngine = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

let upload: multer.Instance = multer({
  storage: storage
});

export default upload;
