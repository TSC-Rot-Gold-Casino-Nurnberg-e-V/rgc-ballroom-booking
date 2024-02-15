import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase.ts";

import { RgcEvent, rgcEventSchema } from "./model/RgcEvent.ts";
import { Dayjs } from "dayjs";

export function useEventsOfDay(date: Dayjs | null): Array<RgcEvent> {
  const [events, setEvents] = useState<Array<RgcEvent>>([]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const todayEventsQuery = query(
      collection(db, "events"),
      where("start", ">", date.startOf("day").toDate()),
      where("start", "<", date.endOf("day").toDate()),
    );
    const unsubscribe = onSnapshot(todayEventsQuery, (querySnapshot) => {
      const events = querySnapshot.docs.map((doc) =>
        rgcEventSchema.parse({
          id: doc.id,
          ...doc.data(),
        }),
      );
      setEvents(events);
    });

    return () => {
      unsubscribe();
    };
  }, [date]);

  return events;
}
