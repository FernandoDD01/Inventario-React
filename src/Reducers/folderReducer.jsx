import { TYPES } from "../actions/folderActions";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { CHANGES } from "../actions/darkmodeActions";

//En este Reducer se maneja el estado de los folders, además de realizar las peticiones a la base de datos
//EL código de las consultas esta comentado, para que no se modifique la base de datos (ya que esta es una versión pública)
//Sin embargo, la base de datos es completamente funcional

export function folderReducer(state, action) {
  let ids = [];
  switch (action.type) {
    case TYPES.ADD_FOLDER: {
      let idLastElement = 0;
      //Se obtiene el id del ultimo elemento (folder)
      if (state.folders.length === 0) {
        idLastElement = 0;
      } else {
        state.folders.forEach((folder) => {
          ids.push(folder.id);
        });

        idLastElement = Math.max(...ids);
      }

      // Agrega un nuevo Folder a la DB de Firebase
      /*setDoc(doc(db, "Folders", `${action.payload}`), {
        id: idLastElement + 1,
        Nombre: `${action.payload}`,
        Categorias: [],
      });*/

      return {
        folders: [
          ...state.folders,
          {
            Nombre: `${action.payload}`,
            Categorias: [],
            id: idLastElement + 1,
          },
        ],
      };
    }

    case TYPES.DELETE_FOLDER: {
      //Borra un folder en la DB de Firebase
      //deleteDoc(doc(db, "Folders", `${action.payload}`));

      return {
        folders: state.folders.filter((folder) => {
          return folder.Nombre !== action.payload;
        }),
      };
    }

    case TYPES.ADD_CATEGORY: {
      const randomColor = () => {
        const colors = [
          "rgba(255, 182, 193,1)",
          "rgba(135, 206, 250,1)",
          "rgba(255, 255, 224,1)",
          "rgba(152, 255, 152,1)",
          "rgba(229, 182, 255,1)",
          "rgba(255, 218, 185,1)",
          "rgba(175, 238, 238,1)",
          "rgba(230, 230, 250,1)",
          "rgba(173, 216, 230,1)",
          "rgba(255, 250, 205,1)",
          "rgba(173, 216, 230,1)",
          "rgba(255, 127, 80,1)",
          "rgba(255, 228, 196,1)",
          "rgba(192, 192, 192,1)",
          "rgba(216, 191, 216,1)",
          "rgba(255, 253, 208,1)",
          "rgba(127, 255, 212,1)",
          "rgba(250, 128, 114,1)",
          "rgba(144, 160, 173,1)",
          "rgba(255, 244, 174,1)",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };

      let categorias = [];

      state.folders
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.forEach((categoria) => {
          categorias.push(categoria);
        });

      const COLOR = randomColor();

      categorias.push({
        [`${action.payload.Nombre}`]: {
          Color: COLOR,
          Productos: [],
        },
      });

      //Agrega una categoria a un cierto folder en la DB de Firebase

      /*const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
*/
      return {
        folders: state.folders.map((folder) => {
          return folder.Nombre === action.payload.View
            ? {
                ...folder,
                Categorias: [
                  ...folder.Categorias,
                  {
                    [`${action.payload.Nombre}`]: {
                      Color: COLOR,
                      Productos: [],
                    },
                  },
                ],
              }
            : folder;
        }),
      };
    }

    case TYPES.DELETE_CATEGORY: {
      let categorias = [];

      state.folders
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.filter((categoria) => {
          return Object.keys(categoria)[0] !== action.payload.Nombre;
        })
        .forEach((categoria) => {
          categorias.push(categoria);
        });

      //Borra una categoría en la DB de Firebase
      /*const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
*/
      return {
        folders: state.folders.map((folder) => {
          return folder.Nombre === action.payload.View
            ? {
                ...folder,
                Categorias: state.folders
                  .find((folder) => {
                    return folder.Nombre === action.payload.View;
                  })
                  .Categorias.filter((categoria) => {
                    return Object.keys(categoria)[0] !== action.payload.Nombre;
                  }),
              }
            : folder;
        }),
      };
    }

    case TYPES.EDIT_CATEGORY: {
      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              return Object.keys(categoria)[0] === action.payload.Name
                ? ((categoria[action.payload.New_name] =
                    categoria[Object.keys(categoria)[0]]),
                  delete categoria[Object.keys(categoria)[0]])
                : categoria;
            })
          : folder;
      });

      let categorias = [];

      clone
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.forEach((categoria) => {
          categorias.push(categoria);
        });

      //Edita una categoría en la DB de Firebase

      /*const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

      */

      return {
        folders: clone,
      };
    }

    case TYPES.ADD_PRODUCT: {
      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              return Object.keys(categoria)[0] === action.payload.Category
                ? Object.values(categoria)[0].Productos.push(
                    action.payload.Product
                  )
                : categoria;
            })
          : folder;
      });

      let categorias = [];

      clone
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.forEach((categoria) => {
          categorias.push(categoria);
        });

      //Agrega un producto en cierta categoría a la DB de Firebase

      /*
      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
*/
      return {
        folders: clone,
      };
    }

    case TYPES.DELETE_PRODUCT: {
      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              return Object.keys(categoria)[0] === action.payload.Category
                ? (Object.values(categoria)[0].Productos = Object.values(
                    clone
                      .find((folder) => {
                        return folder.Nombre === action.payload.View;
                      })
                      .Categorias.find((categoria) => {
                        return (
                          Object.keys(categoria)[0] === action.payload.Category
                        );
                      })
                  )[0].Productos.filter((producto) => {
                    return producto.Nombre !== action.payload.Product;
                  }))
                : categoria;
            })
          : folder;
      });

      let categorias = [];

      clone
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.forEach((categoria) => {
          categorias.push(categoria);
        });

      //Se elimina un producto en cierta categoría en la DB de Firebase
      /*
      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
*/

      return {
        folders: clone,
      };
    }

    case TYPES.EDIT_PRODUCT: {
      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              return Object.keys(categoria)[0] === action.payload.Category
                ? Object.values(categoria)[0].Productos.map((producto) => {
                    return producto.Nombre === action.payload.Product
                      ? ((producto.Nombre = action.payload.New_Product.Nombre),
                        (producto.Cantidad =
                          action.payload.New_Product.Cantidad),
                        (producto.Unidad = action.payload.New_Product.Unidad),
                        (producto.Precio = action.payload.New_Product.Precio),
                        (producto.Enlace = action.payload.New_Product.Enlace),
                        (producto.Nota = action.payload.New_Product.Nota))
                      : producto;
                  })
                : categoria;
            })
          : folder;
      });

      let categorias = [];

      clone
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.forEach((categoria) => {
          categorias.push(categoria);
        });

      //Se edita un prodcuto en cierta categoría en la DB de Firebase
      /*const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
*/

      return {
        folders: clone,
      };
    }

    case TYPES.EDIT_NOTE: {
      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              return Object.keys(categoria)[0] === action.payload.Category
                ? Object.values(categoria)[0].Productos.map((producto) => {
                    return producto.Nombre === action.payload.Product
                      ? (producto.Nota = action.payload.Note)
                      : producto;
                  })
                : categoria;
            })
          : folder;
      });

      let categorias = [];

      clone
        .find((folder) => {
          return folder.Nombre === action.payload.View;
        })
        .Categorias.forEach((categoria) => {
          categorias.push(categoria);
        });

      //Se edita una nota de cierto prodcuto en la DB de Firebase
      /*const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
      */

      return {
        folders: clone,
      };
    }

    case CHANGES.CHANGE_MODE: {
      //Se cambia el tema de la página web en la DB de Firebase
      /* const folderRef = doc(db, "Darkmode", "mode");
      setDoc(folderRef, { darkmode: action.payload });
*/
      return state;
    }

    default:
      return state;
  }
}
