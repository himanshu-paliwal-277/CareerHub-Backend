import { z } from "zod";

export const zodCompanySchema = z.object({
  name: z
    .string({
      required_error: "Company name is required",
    })
    .min(2, "Company name must be at least 2 characters"),

  location: z.string().min(2, "Location must be at least 2 characters"),
  companySize: z.string({ required_error: "Company size is required" }),

  contactInfo: z
    .object({
      contactPerson: z.string().optional(),
      mobile: z.string().optional(),
      email: z.string().optional(),
      linkedin: z.string().url("LinkedIn must be a valid URL").optional(),
    })
    .optional(),

  tags: z.array(z.string()),

  website: z
    .string()
    .url("Website must be a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  linkedin: z
    .string()
    .url("LinkedIn must be a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)),
});
