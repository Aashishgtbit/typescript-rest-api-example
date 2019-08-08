import * as express from "express";
import { uploadImageFiles } from "../media/media.controller";
const router = express.Router();

import * as multer from "multer";
// const upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

var upload = multer({
  storage: storage
});

router.post("/", upload.single("avatar"), uploadImageFiles);

export default router;
