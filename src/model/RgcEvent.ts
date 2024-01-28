import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const rgcEventSchema = z.object({
  name: z.string(),
  start: z.custom<Timestamp>().transform((start) => start.toDate()),
  end: z.custom<Timestamp>().transform((start) => start.toDate()),
  ballroom: z.number().gte(1).lte(3),
  approved: z.boolean(),
  series: z.string().nullable(),
});

export type RgcEvent = z.infer<typeof rgcEventSchema>;

export type RgcEventFirestore = z.input<typeof rgcEventSchema>;

export type NewRgcEvent = Omit<RgcEvent, "series" | "approved">;
