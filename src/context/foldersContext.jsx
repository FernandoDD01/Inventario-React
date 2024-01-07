import { createContext, useReducer } from "react";
import { folders } from "../mookData.json/data.json";
import { folderReducer } from "../Reducers/folderReducer";
import { TYPES } from "../actions/folderActions";

//const folders = [];

const foldersInitialState = { folders };

export const FoldersContext = createContext(foldersInitialState);

export const FoldersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(folderReducer, foldersInitialState);

  const addFolder = (input) => {
    console.log("Se añadio la tarea", input.Nombre);
    dispatch({ type: TYPES.ADD_FOLDER, payload: `${input.Nombre}` });
  };

  const deleteFolder = (folder) => {
    console.log("Se borró el folder", folder);
    dispatch({ type: TYPES.DELETE_FOLDER, payload: `${folder}` });
  };
  return (
    <FoldersContext.Provider value={{ ...state, addFolder, deleteFolder }}>
      {children}
    </FoldersContext.Provider>
  );
};
