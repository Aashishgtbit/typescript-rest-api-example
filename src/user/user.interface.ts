import * as mongoose from "mongoose";

/**
 * @User @interface is used to provide the type to the Post object .
 * @User object will contain fields
 * @_id of type {mongoose.Types.ObjectId}
 * @email of type {string}
 * @password of type {string}
 */

interface User {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  img: string[];
}

export default User;
