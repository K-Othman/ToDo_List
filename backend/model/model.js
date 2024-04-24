import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  todo: {
    required: true,
    type: String,
  },
});

export default mongoose.model("Data", dataSchema);
