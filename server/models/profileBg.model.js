import mongoose from "mongoose";

const { Schema } = mongoose;

const bgSchema = new Schema(
  {
    bgimage: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Background", bgSchema);
