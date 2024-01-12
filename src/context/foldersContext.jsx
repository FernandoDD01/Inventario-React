import { createContext, useReducer } from "react";
import { folders } from "../firebase/firebase";

//import { folders } from "../mookData.json/data.json";
import { folderReducer } from "../Reducers/folderReducer";
import { TYPES } from "../actions/folderActions";
import toastify from "toastify-js";

const foldersInitialState = { folders };

export const FoldersContext = createContext(foldersInitialState);

export const FoldersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(folderReducer, foldersInitialState);

  const addFolder = async (input) => {
    console.log("Se añadio la tarea", input.Nombre);
    dispatch({ type: TYPES.ADD_FOLDER, payload: `${input.Nombre}` });
    toastify({
      text: `El folder ${input.Nombre} fue creado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const deleteFolder = (folder) => {
    console.log("Se borró el folder", folder);
    dispatch({ type: TYPES.DELETE_FOLDER, payload: `${folder}` });
    toastify({
      text: `El folder ${folder} fue eliminado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(121, 8, 8)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const addCategory = (category, view) => {
    console.log("Se agregó la categoria (contexto)", category.Nombre);
    dispatch({
      type: TYPES.ADD_CATEGORY,
      payload: { Nombre: `${category.Nombre}`, View: `${view}` },
    });

    toastify({
      text: `La categoría ${category.Nombre} fue añadida`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    window.scrollTo(0, document.documentElement.scrollHeight);
  };

  const deleteCategory = (category, view) => {
    console.log("Se borro la categoria", category, "En la vista:", view);
    dispatch({
      type: TYPES.DELETE_CATEGORY,
      payload: { Nombre: `${category}`, View: `${view}` },
    });

    toastify({
      text: `La categoría ${category} fue eliminada`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(121, 8, 8)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const editCategory = (category, new_categoryName, view) => {
    dispatch({
      type: TYPES.EDIT_CATEGORY,
      payload: { Name: category, New_name: new_categoryName, View: view },
    });

    toastify({
      text: `La categoría ${category} fue editada`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(102, 69, 7)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const addProduct = (product, category, view) => {
    dispatch({
      type: TYPES.ADD_PRODUCT,
      payload: { Product: product, Category: category, View: view },
    });

    toastify({
      text: `La producto ${product.Nombre} fue añadido`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const deleteProduct = (product, category, view) => {
    dispatch({
      type: TYPES.DELETE_PRODUCT,
      payload: { Product: product, Category: category, View: view },
    });

    toastify({
      text: `El producto ${product} fue eliminado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(121, 8, 8)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
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

    toastify({
      text: `El producto ${product} fue editado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(102, 69, 7)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
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
