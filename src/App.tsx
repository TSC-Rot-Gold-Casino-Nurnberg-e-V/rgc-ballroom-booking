import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.ts";
import { useEffect, useState } from "react";
import { Session, sessionSchema } from "../utils/Session.ts";

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const today =
  year +
  "-" +
  (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
  "-" +
  (day < 10 ? "0" + day : day);
function App() {
  const [data, setData] = useState<Array<Session>>([]);
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState("Saal 1");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState(today);
  const [filteredDate, setFilteredDate] = useState(today);
  const click = async (event: React.MouseEvent) => {
    event.preventDefault();
    const bookingRef = collection(db, "Buchungen");
    await addDoc(bookingRef, {
      title: title,
      room: room,
      start: start,
      end: end,
      date: date,
    });
    setTitle("");
    setRoom("Saal 1");
    setStart("");
    setEnd("");
    setDate(today);
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Buchungen"), (querySnapshot) => {
      console.log("changed");
      console.log("Current querySnapshot: ", querySnapshot.docs);
      const parsedData = sessionSchema.parse(querySnapshot.docs);
      console.log("Hier!!", parsedData);
      // const newData = querySnapshot.docs.map((doc) => doc.data());
      setData([...data, parsedData]);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <form action="" id="form">
        <div>
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            id="title"
            value={title}
            className="border-2"
            onChange={(event) => {
              return setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="room">Saal</label>
          <select
            id="room"
            name="Saal"
            className="border-2"
            value={room}
            onChange={(event) => {
              return setRoom(event.target.value);
            }}
          >
            <option value="1">Saal 1</option>
            <option value="2">Saal 2</option>
            <option value="3">Saal 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Datum:</label>
          <input
            type="date"
            id="date"
            value={date}
            required
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="start">Start:</label>
          <input
            type="time"
            id="start"
            name="start"
            min="08:00"
            max="22:00"
            value={start}
            required
            onChange={(event) => {
              return setStart(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="end">Ende:</label>
          <input
            type="time"
            id="end"
            name="end"
            min="08:00"
            max="22:00"
            value={end}
            required
            onChange={(event) => {
              return setEnd(event.target.value);
            }}
          />
        </div>
        <button
          onClick={(event) => {
            return click(event);
          }}
        >
          Send
        </button>
      </form>
      <div>
        <label htmlFor="date">Datum:</label>
        <input
          type="date"
          id="date"
          value={filteredDate}
          onChange={(event) => setFilteredDate(event.target.value)}
        />

        {data.map((object) => {
          return <div>{object.title}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
