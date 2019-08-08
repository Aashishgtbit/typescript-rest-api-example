import * as mongoose from "mongoose";
import ImageData from "./media.image.interface";

/**
 * @Media @interface is used to provide the type to the Media object .
 * @Media object will contain fields
 * @_id of type mongoose.Types.ObjectId
 * @img of type @ImageData
 */

interface Media {
  _id: mongoose.Types.ObjectId;
  img: ImageData;
}

export default Media;
