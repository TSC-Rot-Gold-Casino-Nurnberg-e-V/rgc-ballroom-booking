import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material-next";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [date, setDate] = useState<Dayjs | null>(dayjs());

  return (
    <div className="h-dvh flex flex-col">
      <div
        className="mx-auto w-fit space-y-2 p-4"
        style={{ order: isMobile ? 1 : 0 }}
      >
        <DatePicker label="Datum" value={date} onChange={setDate} />
        <div className="mx-auto flex w-fit gap-1">
          <IconButton
            aria-label="vorheriger Tag"
            onClick={() =>
              setDate((prevDate) => prevDate?.subtract(1, "day") ?? null)
            }
          >
            <ChevronLeft />
          </IconButton>
          <Button variant="outlined" onClick={() => setDate(dayjs())}>
            Heute
          </Button>
          <IconButton
            aria-label="nächster Tag"
            onClick={() =>
              setDate((prevDate) => prevDate?.add(1, "day") ?? null)
            }
          >
            <ChevronRight />
          </IconButton>
        </div>
      </div>
      <div className="grow bg-cyan-100"></div>
    </div>
  );
};
