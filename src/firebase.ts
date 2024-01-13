import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { RgcEvent } from "./RgcEvent.ts";

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

export async function addEvent(event: RgcEvent) {
  const documentReference = await addDoc(collection(db, "events"), {
    name: event.name,
    start: new Timestamp(
      parseInt((event.start.getTime() / 1000).toFixed(0)),
      0,
    ),
    end: new Timestamp(parseInt((event.end.getTime() / 1000).toFixed(0)), 0),
    ballroom: event.ballroom,
  });
  console.log("documentReference: ", documentReference);
}
