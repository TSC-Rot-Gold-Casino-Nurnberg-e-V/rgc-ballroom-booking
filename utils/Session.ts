import { z } from "zod";

export const sessionSchema = z.object({
  title: z.string(),
  room: z.string(),
  start: z.string(),
  end: z.string(),
  date: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;
