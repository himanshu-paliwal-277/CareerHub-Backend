import { z } from "zod";

export const zodUpdateApplicationSchema = z.object({
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
    .min(1, "Notes cannot be empty"),
});
