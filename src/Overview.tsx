import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { BottomAppBar } from "./BottomAppBar.tsx";

export const Overview = () => {
  const DISPLAYED_HOURS = 14;
  const SECTIONS_PER_HOUR = 4;
  const ROWS = DISPLAYED_HOURS * SECTIONS_PER_HOUR;
  const COLUMN_HEIGHT = 25;

  const START_TIME = dayjs("08:00", "HH:mm");

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr]">
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
        onPrevClick={() =>
          setDate((prevDate) => prevDate?.subtract(1, "day") ?? null)
        }
        onNextClick={() =>
          setDate((prevDate) => prevDate?.add(1, "day") ?? null)
        }
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
              <div className="row-span-2 border-l" key={index}></div>
            ))}
          </div>
          {/* COLUMN 2 */}
          <div
            className="grid divide-y"
            style={{ gridTemplateRows: `repeat(${ROWS}, ${COLUMN_HEIGHT}px)` }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div className="row-span-2 border-l" key={index}></div>
            ))}
          </div>
          {/* COLUMN 3 */}
          <div
            className="grid divide-y"
            style={{ gridTemplateRows: `repeat(${ROWS}, ${COLUMN_HEIGHT}px)` }}
          >
            {Array.from({ length: ROWS / 2 }).map((_, index) => (
              <div className="row-span-2 border-l" key={index}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
