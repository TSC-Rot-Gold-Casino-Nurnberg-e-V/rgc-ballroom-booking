import { DateTimePicker } from "@mui/x-date-pickers";
import { FormEvent, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addEvent } from "./firebase.ts";

export const NewEvent = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState<dayjs.Dayjs | null>(null);
  const [end, setEnd] = useState<dayjs.Dayjs | null>(null);
  const [ballroom, setBallroom] = useState<1 | 2 | 3>(1);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name === "" || start === null || end === null) {
      // TODO: error handling
      console.log("inputs invalid");
      return;
    }

    if (end.diff(start, "hours") > 24) {
      // TODO: error handling
      console.log("event zu lang");
    }

    await addEvent({
      name,
      start: start.toDate(),
      end: end.toDate(),
      ballroom,
      approved: false,
    });

    console.log("added event successfully");
  }

  return (
    <main className="mx-auto max-w-screen-sm space-y-4 p-4">
      <h1 className="text-2xl">Veranstaltung erstellen</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <DateTimePicker
          label="Start"
          value={start}
          onChange={setStart}
          maxDateTime={end ?? undefined}
        />
        <DateTimePicker
          label="Ende"
          value={end}
          onChange={setEnd}
          minDateTime={start ?? undefined}
        />
        <FormControl fullWidth>
          <InputLabel id="ballroom">Saal</InputLabel>
          <Select
            labelId="ballroom"
            value={ballroom}
            label="Saal"
            onChange={(event) =>
              setBallroom(
                typeof event.target.value === "string" ? 1 : event.target.value,
              )
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="outlined">
          Erstellen
        </Button>
      </form>
    </main>
  );
};
