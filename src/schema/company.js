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
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    contactInfo: {
      contactPerson: { type: String },
      mobile: { type: String },
      email: { type: String },
      linkedIn: { type: String },
    },
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Company = mongoose.model("companies", CompanySchema);

export default Company;
