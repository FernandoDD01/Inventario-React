import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

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

//Inicialización de Firebase
const app = initializeApp(firebaseConfig);

//Inicialización de Firestore (La DB de Firebase)
export const db = getFirestore(app);
//En "folders" se van guardar todos los documentos que se obtengan de la consulta la base de datos

export async function Folders() {
  let folders = [];

  const querySnapshot = await getDocs(collection(db, "Folders"));
  querySnapshot.forEach((doc) => {
    folders.push(doc.data());
  });

  return folders;
}

export async function Mode() {
  let mode = {};
  const querySnapshotMode = await getDocs(collection(db, "Darkmode"));
  querySnapshotMode.forEach((doc) => {
    mode = doc.data();
  });

  return mode;
}

//En "mode" se obtiene el estado del darkmode (que igual esta en la base de datos)
