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

  const addCategory = (category, view) => {
    console.log("Se agregó la categoria (contexto)", category.Nombre);
    dispatch({
      type: TYPES.ADD_CATEGORY,
      payload: { Nombre: `${category.Nombre}`, View: `${view}` },
    });
  };

  const deleteCategory = (category, view) => {
    console.log("Se borro la categoria", category, "En la vista:", view);
    dispatch({
      type: TYPES.DELETE_CATEGORY,
      payload: { Nombre: `${category}`, View: `${view}` },
    });
  };

  const editCategory = (category, new_categoryName, view) => {
    dispatch({
      type: TYPES.EDIT_CATEGORY,
      payload: { Name: category, New_name: new_categoryName, View: view },
    });
  };

  const addProduct = (product, category, view) => {
    dispatch({
      type: TYPES.ADD_PRODUCT,
      payload: { Product: product, Category: category, View: view },
    });
  };

  const deleteProduct = (product, category, view) => {
    dispatch({
      type: TYPES.DELETE_PRODUCT,
      payload: { Product: product, Category: category, View: view },
    });
  };

  const editProduct = (product, new_product, category, view) => {
    dispatch({
      type: TYPES.EDIT_PRODUCT,
      payload: {
        Product: product,
        New_Product: new_product,
        Category: category,
        View: view,
      },
    });
  };

  const editNote = (note, product, category, view) => {
    dispatch({
      type: TYPES.EDIT_NOTE,
      payload: { Note: note, Product: product, Category: category, View: view },
    });
  };

  return (
    <FoldersContext.Provider
      value={{
        ...state,
        addFolder,
        deleteFolder,
        addCategory,
        deleteCategory,
        addProduct,
        deleteProduct,
        editProduct,
        editCategory,
        editNote,
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
};
