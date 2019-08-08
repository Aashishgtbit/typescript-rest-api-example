import * as mongoose from "mongoose";
import Media from "./media.interface";

const mediaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  img: { data: Buffer, contentType: String }
});

const mediaModel = mongoose.model<Media & mongoose.Document>(
  "Images",
  mediaSchema
);

export default mediaModel;
