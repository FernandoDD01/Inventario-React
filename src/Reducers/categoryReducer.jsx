/*import { db } from "../firebase/firebase.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { TYPES } from "../actions/categoryActions";

import { Categories } from "../firebase/firebase.js";*/

let Categories = [1, 2, 3, 4];

export const categoriesInitialState = { Categories };

export function categoryReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_CATEGORY: {
      try {
        setDoc(
          doc(db, "Folders", `${action.payload.view}`),
          {
            Nombre: `${action.payload.view}`,
            Categorias: {
              [`${action.payload.nombreCategory}`]: {
                Color: "rgba(255,253,208,1)",
              },
            },
          },
          { merge: true }
        );
      } catch (error) {
        console.error(error);
      }

      let new_name = `${action.payload.nombreCategory}`;
      let new_value = { Color: "rgba(255,253,208,1)" };

      console.log(
        "asi va la construccion",
        state.Categories.find((objeto) => objeto.Nombre == action.payload.view)
          .Categorias
      );

      let objeto_existente = state.Categories.find(
        (objeto) => objeto.Nombre == action.payload.view
      ).Categorias;

      objeto_existente[new_name] = new_value;

      console.log("Segun esto:", objeto_existente);

      state.Categories.find(
        (objeto) => objeto.Nombre == action.payload.view
      ).Categorias = objeto_existente;

      return {
        Categories: state.Categories,
      };
    }

    case TYPES.PRE_CONFIG: {
      console.log(action.payload);
      return {
        Categories: [
          ...state.Categories,
          { Categorias: {}, Nombre: `${action.payload}` },
        ],
      };
    }

    case TYPES.EDIT_CATEGORY: {
      let new_name = `${action.payload.nombreNuevoCategory}`;
      let new_value = { Color: "rgba(255,253,208,1)" };

      console.log(
        "asi va la construccion",
        state.Categories.find((objeto) => objeto.Nombre == action.payload.view)
          .Categorias
      );

      let objeto_existente = state.Categories.find(
        (objeto) => objeto.Nombre == action.payload.view
      ).Categorias;

      objeto_existente[new_name] = new_value;

      console.log("Segun esto:", objeto_existente);

      state.Categories.find(
        (objeto) => objeto.Nombre == action.payload.view
      ).Categorias = objeto_existente;

      return {
        Categories: state.Categories,
      };
    }

    default:
      return state;
  }
}
