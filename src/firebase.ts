import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { RgcEvent } from "./RgcEvent.ts";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

export async function addEvent(event: RgcEvent) {
  const documentReference = await addDoc(collection(db, "events"), {
    name: event.name,
    start: new Timestamp(
      parseInt((event.start.getTime() / 1000).toFixed(0)),
      0,
    ),
    end: new Timestamp(parseInt((event.end.getTime() / 1000).toFixed(0)), 0),
    ballroom: event.ballroom,
    approved: event.approved,
  });
  console.log("documentReference: ", documentReference);
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
