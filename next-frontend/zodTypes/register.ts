import { z } from "zod";

const registerSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

export default registerSchema;
