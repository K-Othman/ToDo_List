import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const AuthModel = mongoose.model("Auth", authSchema);
export default AuthModel;
