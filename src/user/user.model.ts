import * as mongoose from "mongoose";
import User from "./user.interface";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  img: { data: Buffer, contentType: String }
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
