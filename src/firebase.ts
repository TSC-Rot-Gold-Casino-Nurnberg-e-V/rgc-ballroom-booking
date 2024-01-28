import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { NewRgcEvent, RgcEventFirestore } from "./model/RgcEvent.ts";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Repetition } from "./model/Repetition.ts";
import dayjs, { ManipulateType } from "dayjs";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxkeKTFFExWxZJwfUZzertWJQoPzDyf2c",
  authDomain: "rgc-ballroom-booking-dev.firebaseapp.com",
  projectId: "rgc-ballroom-booking-dev",
  storageBucket: "rgc-ballroom-booking-dev.appspot.com",
  messagingSenderId: "202277925863",
  appId: "1:202277925863:web:2ea0a58280fa788b048342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function addEvent(newEvent: NewRgcEvent) {
  return addDoc(collection(db, "events"), {
    name: newEvent.name,
    start: toTimestamp(newEvent.start),
    end: toTimestamp(newEvent.end),
    ballroom: newEvent.ballroom,
    approved: false,
    series: null,
  } satisfies RgcEventFirestore);
}

export async function addSeries(
  newEvent: NewRgcEvent,
  { repetition, endsAfter }: { repetition: Repetition; endsAfter: number },
) {
  try {
    const eventsCollectionRef = collection(db, "events");
    const seriesDocRef = await addDoc(collection(db, "series"), {
      events: [],
    });

    const batch = writeBatch(db);

    for (let i = 0; i < endsAfter; i++) {
      const newEventDocRef = doc(eventsCollectionRef);
      const valueToAdd = repetition === "every-two-weeks" ? i * 2 : i;
      batch.set(newEventDocRef, {
        ...newEvent,
        start: toTimestamp(
          dayjs(newEvent.start).add(valueToAdd, toUnit(repetition)).toDate(),
        ),
        end: toTimestamp(
          dayjs(newEvent.end).add(valueToAdd, toUnit(repetition)).toDate(),
        ),
        approved: false,
        series: seriesDocRef.id,
      } satisfies RgcEventFirestore);
      batch.update(seriesDocRef, {
        events: arrayUnion(newEventDocRef.id),
      });
    }

    await batch.commit();
  } catch (e: unknown) {
    console.error(e);
  }
}

export async function register(email: string, password: string) {
  console.log("register()");
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  console.log("created user successfully");
  await setDoc(doc(db, "users", userCredential.user.uid), {
    role: "trainer",
    email: userCredential.user.email,
  });
  console.log("init user data successfully");
}

export async function login(email: string, password: string) {
  console.log("login()");
  await signInWithEmailAndPassword(auth, email, password);
}

export async function getRole(uid: string) {
  const documentSnapshot = await getDoc(doc(db, "users", uid));
  return documentSnapshot.get("role");
}

function toTimestamp(date: Date): Timestamp {
  return new Timestamp(parseInt((date.getTime() / 1000).toFixed(0)), 0);
}

function toUnit(repetition: Repetition): ManipulateType {
  switch (repetition) {
    case "one-off":
      return "days";
    case "daily":
      return "days";
    case "weekly":
      return "weeks";
    case "every-two-weeks":
      return "weeks";
    case "monthly":
      return "months";
    case "yearly":
      return "years";
  }
}
