import mongoose from "mongoose";
const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: { type: Date, default: Date.now(), expires: 86400 },
  },
  { timestamps: true }
);

const BlackListToken = mongoose.model("BlackListToken", blackListSchema);

export default BlackListToken;
