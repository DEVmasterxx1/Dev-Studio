import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", ProjectSchema);
