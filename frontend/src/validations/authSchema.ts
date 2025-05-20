import { z as zod } from "zod";

const signupSchema = zod.object({
  username: zod
    .string()
    .trim()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(20, { message: "Username must not exceed 20 characters" })
    .regex(/^[a-zA-Z]+$/, { message: "Username can only contain letters" }),
  email: zod
    .string()
    .trim()
    .max(50, { message: "Email must not exceed 50 characters" })
    .email({ message: "Invalid email format" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must not exceed 30 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

const loginSchema = zod.object({
  email: zod
    .string()
    .trim()
    .max(50, { message: "Email must not exceed 50 characters" })
    .email({ message: "Invalid email format" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must not exceed 30 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export { signupSchema, loginSchema };
