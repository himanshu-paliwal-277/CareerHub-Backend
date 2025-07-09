import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      unique: true,
    },
    linkedin: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    contact: {
      phone: { type: String },
      email: { type: String },
      linkedin: { type: String },
    },
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Company = mongoose.model("companies", CompanySchema);

export default Company;
