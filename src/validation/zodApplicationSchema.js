import { z } from "zod";

export const zodApplicationSchema = z.object({
  company: z.string({
    required_error: "Company ID is required",
  }).length(24, "Invalid Company ObjectId"),

  user: z.string({
    required_error: "User ID is required",
  }).length(24, "Invalid User ObjectId"),

  status: z.enum([
    "Not Applied",
    "Applied",
    "Shortlisted",
    "Interview",
    "Offer",
    "Rejected",
  ]).default("Not Applied"),

  applicationDate: z.string()
    .datetime("Invalid date format")
    .optional(),

  notes: z.string().optional(),
});
