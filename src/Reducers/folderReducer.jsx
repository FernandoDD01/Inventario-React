import { db } from "../firebase/firebase.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { TYPES } from "../actions/folderActions";

import { Folders } from "../firebase/firebase.js";

//Primero -> Obtener los folders que ya hay en la base de datos

//

export const folderInitialState = { Folders };

export function folderReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_FOLDER: {
      try {
        setDoc(doc(db, "Folders", `${action.payload}`), {
          Categorias: {
            /*
            Bebidas: {
              Productos: {
                Producto_1: {
                  precio: 32,
                },
              },
            },*/
          },
        });
      } catch (error) {
        console.error(error);
      }

      console.log("Folder agregado");
      return { Folders: [...state.Folders, `${action.payload}`] };
    }

    case TYPES.DELETE_FOLDER: {
      deleteDoc(doc(db, "Folders", `${action.payload}`));

      return {
        Folders: state.Folders.filter((folder) => {
          return folder !== action.payload;
        }),
      };
    }

    default:
      return state;
  }
}
