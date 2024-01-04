import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

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
export const app = initializeApp(firebaseConfig);

//Initialize Firestore
export const db = getFirestore(app);

//Primero: obtener los folders que ya estan en la base de datos

export let Folders = [];
export let Categories = [];

const q = query(collection(db, "Folders"));

const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
  Categories.push(doc.data());
});

querySnapshot.forEach((doc) => {
  Folders.push(doc.id);
});

console.log(Categories);
