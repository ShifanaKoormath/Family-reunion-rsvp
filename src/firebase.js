import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy-MCNThDGmHGvg7GWffxWb1mhv4y6JYY",
  authDomain: "family-reunion-39c4a.firebaseapp.com",
  projectId: "family-reunion-39c4a",
  storageBucket: "family-reunion-39c4a.firebasestorage.app",
  messagingSenderId: "47710314643",
  appId: "1:47710314643:web:262a15da01767af3232d66",
  measurementId: "G-S3C4B2886H"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);