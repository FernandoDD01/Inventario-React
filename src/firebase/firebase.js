import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

import { collection, getDocs } from "firebase/firestore";

export const folders = [];
export let mode = {};

const querySnapshotMode = await getDocs(collection(db, "Darkmode"));
querySnapshotMode.forEach((doc) => {
  mode = doc.data();
});

const querySnapshot = await getDocs(collection(db, "Folders"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().Nombre}`);
  folders.push(doc.data());
});

console.log(folders);
