import { z } from "zod";

export const zodCompanySchema = z.object({
  name: z.string({
    required_error: "Company name is required",
  }).min(2, "Company name must be at least 2 characters"),
  
  website: z.string()
    .url("Website must be a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  linkedin: z.string()
    .url("LinkedIn must be a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .optional(),

  contactPerson: z.string()
    .min(2, "Contact person must be at least 2 characters")
    .optional(),

  contact: z.object({
    phone: z.string()
      .regex(/^\+?\d{7,15}$/, "Phone must be a valid number")
      .optional(),

    email: z.string()
      .email("Invalid email format")
      .optional(),

    linkedin: z.string()
      .url("LinkedIn must be a valid URL")
      .optional(),
  }).optional(),

  tags: z.array(z.string()).optional(),
});
