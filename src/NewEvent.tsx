import { DateTimePicker } from "@mui/x-date-pickers";
import { FormEvent, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addEvent, addSeries } from "./firebase.ts";
import {
  Repetition,
  repetitionEnumSchema,
  toEndsAfter,
} from "./model/Repetition.ts";
import { useSnackbar } from "./snackbarContext.ts";

export const NewEvent = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState<dayjs.Dayjs | null>(null);
  const [end, setEnd] = useState<dayjs.Dayjs | null>(null);
  const [ballroom, setBallroom] = useState<1 | 2 | 3>(1);
  const [repetition, setRepetition] = useState<Repetition>("one-off");
  const [endsAfter, setEndsAfter] = useState<number | null>(null);

  const { showSnackbar } = useSnackbar();

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

    if (repetition === "one-off") {
      await addEvent({
        name,
        start: start.toDate(),
        end: end.toDate(),
        ballroom,
      });
      showSnackbar("Event wurde erfolgreich erstellt");
    } else {
      if (endsAfter === null) {
        return;
      }

      await addSeries(
        {
          name,
          start: start.toDate(),
          end: end.toDate(),
          ballroom,
        },
        {
          repetition,
          endsAfter,
        },
      );
      showSnackbar("Eventserie wurde erfolgreich erstellt");
    }
  }

  function handleRepetitionChange(event: SelectChangeEvent<Repetition>) {
    const updatedRepetition = repetitionEnumSchema.parse(event.target.value);
    setRepetition(updatedRepetition);
    setEndsAfter(toEndsAfter(updatedRepetition));
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
        <div className="flex gap-2">
          <FormControl fullWidth className="grow">
            <InputLabel id="repetition">Wiederkehrend</InputLabel>
            <Select
              labelId="repetition"
              value={repetition}
              label="Wiederkehrend"
              onChange={handleRepetitionChange}
            >
              <MenuItem value={"one-off" satisfies Repetition}>
                Einmalig
              </MenuItem>
              <MenuItem value={"daily" satisfies Repetition}>Täglich</MenuItem>
              <MenuItem value={"weekly" satisfies Repetition}>
                Wöchentlich
              </MenuItem>
              <MenuItem value={"every-two-weeks" satisfies Repetition}>
                Alle zwei Wochen
              </MenuItem>
              <MenuItem value={"monthly" satisfies Repetition}>
                Monatlich
              </MenuItem>
              <MenuItem value={"yearly" satisfies Repetition}>
                Jährlich
              </MenuItem>
            </Select>
          </FormControl>
          {repetition !== "one-off" ? (
            <TextField
              id="outlined-number"
              label="Endet nach"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={endsAfter}
              onChange={(event) =>
                setEndsAfter(
                  isNaN(parseInt(event.target.value))
                    ? null
                    : parseInt(event.target.value),
                )
              }
            />
          ) : null}
        </div>
        <Button type="submit" variant="outlined">
          Erstellen
        </Button>
      </form>
    </main>
  );
};
