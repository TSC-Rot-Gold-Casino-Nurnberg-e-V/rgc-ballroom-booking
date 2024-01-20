import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { BottomAppBar } from "./BottomAppBar.tsx";
import { useSwipe } from "./useSwipe.ts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase.ts";
import { RgcEvent } from "./RgcEvent.ts";

export const Overview = () => {
  const DISPLAYED_HOURS = 14;
  const SECTIONS_PER_HOUR = 4;
  const ROWS = DISPLAYED_HOURS * SECTIONS_PER_HOUR;
  const COLUMN_HEIGHT = 25;

  const START_TIME = dayjs("08:00", "HH:mm");

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [events, setEvents] = useState<Array<RgcEvent>>([]);

  function incrementDate() {
    setDate((prevDate) => prevDate?.add(1, "day") ?? null);
  }

  function decrementDate() {
    setDate((prevDate) => prevDate?.subtract(1, "day") ?? null);
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipedLeft: incrementDate,
    onSwipedRight: decrementDate,
  });

  useEffect(() => {
    if (date === null) {
      return;
    }
    getDocs(
      query(
        collection(db, "events"),
        where("start", ">", date.startOf("day").toDate()),
        where("start", "<", date.endOf("day").toDate()),
      ),
    ).then((querySnapshot) => {
      const events = querySnapshot.docs.map((doc) => {
        const documentData = doc.data();
        return {
          name: documentData.name,
          start: documentData.start.toDate(),
          end: documentData.end.toDate(),
          ballroom: documentData.ballroom,
          approved: documentData.approved,
        } satisfies RgcEvent;
      });
      setEvents(events);
    });
  }, [date]);

  return (
    <div
      className="grid h-dvh grid-rows-[auto_1fr]"
      onTouchStart={(event) => onTouchStart(event.targetTouches[0].clientX)}
      onTouchMove={(event) => onTouchMove(event.targetTouches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <MobileDatePicker
        open={datePickerOpen}
        onOpen={() => setDatePickerOpen(true)}
        onClose={() => setDatePickerOpen(false)}
        label="Datum"
        value={date}
        onChange={setDate}
        sx={{
          display: "none",
        }}
      />
      <BottomAppBar
        onPrevClick={decrementDate}
        onNextClick={incrementDate}
        onTodayClick={() => setDate(dayjs())}
        onCalendarClick={() => setDatePickerOpen(true)}
      />
      <div className="grid grid-rows-[auto_1fr] overflow-y-auto">
        {/* WEEKDAY + DATE */}
        <div className="p-2 shadow">
          <div className="text-center text-xl font-bold">
            {date?.format("dddd")}
          </div>
          <div className="text-center text-stone-700">
            {date?.format("DD. MMMM YYYY")}
          </div>
        </div>

        <div className="grid grid-cols-[auto_10px_1fr_1fr_1fr] overflow-y-auto pt-4">
          {/* TIME */}
          <div
            className="grid"
            style={{
              gridTemplateRows: `repeat(${ROWS / 2}, ${COLUMN_HEIGHT * 2}px)`,
            }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div className="-mt-3.5 p-1" key={index}>
                <div className="text-sm">
                  {START_TIME.add(index * 30, "minute").format("HH:mm")}
                </div>
              </div>
            ))}
          </div>

          {/* OVERLAPPING HORIZONTAL LINE */}
          <div
            className="grid divide-y"
            style={{
              gridTemplateRows: `repeat(${ROWS}, ${COLUMN_HEIGHT}px)`,
            }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div key={index} className="row-span-2"></div>
            ))}
          </div>

          {/* COLUMN 1 */}
          <div
            className="grid divide-y"
            style={{ gridTemplateRows: `repeat(${ROWS}, ${COLUMN_HEIGHT}px)` }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div
                className="col-start-1 row-span-2 border-l"
                key={index}
                style={{
                  gridRowStart: index * 2 + 1,
                }}
              ></div>
            ))}
            {events.filter((e) => e.ballroom === 1).map(EventComponent)}
          </div>
          {/* COLUMN 2 */}
          <div
            className="grid divide-y"
            style={{ gridTemplateRows: `repeat(${ROWS}, ${COLUMN_HEIGHT}px)` }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div
                className="col-start-1 row-span-2 border-l"
                key={index}
                style={{
                  gridRowStart: index * 2 + 1,
                }}
              ></div>
            ))}
            {events.filter((e) => e.ballroom === 2).map(EventComponent)}
          </div>
          {/* COLUMN 3 */}
          <div
            className="grid divide-y"
            style={{ gridTemplateRows: `repeat(${ROWS}, ${COLUMN_HEIGHT}px)` }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div
                className="col-start-1 row-span-2 border-l"
                key={index}
                style={{
                  gridRowStart: index * 2 + 1,
                }}
              ></div>
            ))}
            {events.filter((e) => e.ballroom === 3).map(EventComponent)}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventComponent = ({ start, end, name, ballroom }: RgcEvent) => {
  const rowStart = 1 + (start.getHours() - 8) * 4 + start.getMinutes() / 15;
  const rowEnd = 1 + (end.getHours() - 8) * 4 + end.getMinutes() / 15;
  return (
    <div
      key={name}
      className="relative col-start-1 m-1 rounded-lg bg-rose-300 p-1 shadow"
      style={{
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        marginLeft: 4 + Math.random() * 10,
      }}
    >
      <div className="text-sm text-stone-900">{name}</div>
      <div className="absolute bottom-1 right-2 text-xs text-stone-700">
        {ballroom}
      </div>
    </div>
  );
};
