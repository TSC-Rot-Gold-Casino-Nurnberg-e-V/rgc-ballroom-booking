import { z } from "zod";

export const repetitionEnumSchema = z.enum([
  "one-off",
  "daily",
  "weekly",
  "every-two-weeks",
  "monthly",
  "yearly",
]);

export type Repetition = z.infer<typeof repetitionEnumSchema>;

export function toEndsAfter(repetition: Repetition) {
  switch (repetition) {
    case "one-off":
      return null;
    case "daily":
      return 365;
    case "weekly":
      return 52;
    case "every-two-weeks":
      return 26;
    case "monthly":
      return 12;
    case "yearly":
      return 1;
  }
}
