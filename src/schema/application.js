import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Cleared",
        "Offer",
        "Rejected",
      ],
      default: "Not Applied",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  { timestamps: true }
);

const Application = mongoose.model("applications", ApplicationSchema);

export default Application;
