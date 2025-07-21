import { z } from "zod";

export const zodApplicationSchema = z.object({
  company: z
    .string({
      required_error: "Company ID is required",
    })
    .length(24, { message: "Invalid Company ObjectId" }),

  status: z.enum(
    [
      "Not Applied",
      "Applied",
      "Shortlisted",
      "Interview",
      "Offer",
      "Rejected",
      "Cleared",
    ],
    {
      required_error: "Status is required",
    }
  ),

  applicationDate: z
    .string({
      required_error: "Application date is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  notes: z
    .string({
      required_error: "Notes are required",
    })
    .min(1, { message: "Notes cannot be empty" }),
});
