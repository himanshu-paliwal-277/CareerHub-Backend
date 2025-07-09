import { z } from "zod";

export const zodSignInSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});
