import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
