import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  todo: {
    required: true,
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Data", dataSchema);
