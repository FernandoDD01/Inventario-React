# App de inventario y lista de compras elaborado con ReactJS, NodeJS y Firebase

--

Índice


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrUghCChOFooL5rv1usgyY8TEkXREbupo",
  authDomain: "inventario-proyect.firebaseapp.com",
  projectId: "inventario-proyect",
  storageBucket: "inventario-proyect.appspot.com",
  messagingSenderId: "6940125635",
  appId: "1:6940125635:web:3181eb615393e31ca13576",
  measurementId: "G-1B0JGHN5B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
