import * as mongoose from "mongoose";

/**
 * @ImageData @interface is used to provide the type to the Media object .
 * @ImageData object will contain fields
 * @data of type @Buffer
 * @contentType of type @string
 */
interface ImageData {
  data: Buffer;
  contentType: string;
}

export default ImageData;
