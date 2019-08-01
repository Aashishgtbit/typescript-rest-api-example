import * as mongoose from "mongoose";

interface User {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
}

export default User;
