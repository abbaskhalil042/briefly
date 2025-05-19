import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

export default loginSchema;
