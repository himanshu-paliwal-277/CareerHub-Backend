import { z } from "zod";

export const zodSignUpSchema = z.object({
  userName: z.string({ message: "User name is required" }).min(1),
  email: z.string({ message: "Email is required" }).email(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});
