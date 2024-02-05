/*Este es el contexto más importante,
 ya que en el se encuentra el estado de los folders
y tiene todas las acciones que realiza la app principal */
import { createContext, useReducer } from "react";
import { folders } from "../mookData.json/data.json";
import { folderReducer } from "../Reducers/folderReducer";
import { TYPES } from "../actions/folderActions";

//Toastify es un libreria muy útil para generar mensajes emergentes
import toastify from "toastify-js";

/*const datos = async () => {
  const folders = await Folders();
  console.log(folders);

  return folders;
};*/

//El estado inicial es el objeto de folders de la consulta a la base de datos
const foldersInitialState = { folders };

export const FoldersContext = createContext(foldersInitialState);

export const FoldersProvider = ({ children }) => {
  //Solo se creó un reducer para manejar todo el estado
  const [state, dispatch] = useReducer(folderReducer, foldersInitialState);

  //Ejecuta la acción de agregar folder
  const addFolder = async (input) => {
    dispatch({ type: TYPES.ADD_FOLDER, payload: `${input.Nombre}` });
    //Se lanza el mensaje
    toastify({
      text: `El folder ${input.Nombre} fue creado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {},
    }).showToast();
  };

  //Ejecuta la acción de borrar folder
  const deleteFolder = (folder) => {
    dispatch({ type: TYPES.DELETE_FOLDER, payload: `${folder}` });
    //Se lanza el mensaje
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

  //Ejecuta la acción de agregar una categoría

  const addCategory = (category, view) => {
    dispatch({
      type: TYPES.ADD_CATEGORY,
      payload: { Nombre: `${category.Nombre}`, View: `${view}` },
    });

    //Se lanza el mensaje

    toastify({
      text: `La categoría ${category.Nombre} fue añadida`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {},
    }).showToast();

    //El scroll se baja cada vez que se agrega una categoría
    window.scrollTo(0, document.documentElement.scrollHeight);
  };

  //Ejecuta la acción de borrar una categoría
  const deleteCategory = (category, view) => {
    dispatch({
      type: TYPES.DELETE_CATEGORY,
      payload: { Nombre: `${category}`, View: `${view}` },
    });

    //Se lanza el mensaje

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

  //Ejecuta la acción de editar una categoría
  const editCategory = (category, new_categoryName, view) => {
    dispatch({
      type: TYPES.EDIT_CATEGORY,
      payload: { Name: category, New_name: new_categoryName, View: view },
    });

    //Se lanza el mensaje
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

  //Ejecuta la acción de agregar un producto
  const addProduct = (product, category, view) => {
    dispatch({
      type: TYPES.ADD_PRODUCT,
      payload: { Product: product, Category: category, View: view },
    });

    //Se lanza el mensaje
    toastify({
      text: `La producto ${product.Nombre} fue añadido`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {},
    }).showToast();
  };

  //Ejecuta la acción de borrar un producto
  const deleteProduct = (product, category, view) => {
    dispatch({
      type: TYPES.DELETE_PRODUCT,
      payload: { Product: product, Category: category, View: view },
    });
    //Se lanza el mensaje
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

  //Ejecuta la acción de editar un producto
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

    //Se lanza el mensaje
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

  //Ejecuta la acción de editar una nota
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
