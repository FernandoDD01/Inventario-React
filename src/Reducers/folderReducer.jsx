import { TYPES } from "../actions/folderActions";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { CHANGES } from "../actions/darkmodeActions";

export function folderReducer(state, action) {
  let ids = [];
  switch (action.type) {
    case TYPES.ADD_FOLDER: {
      console.log("Folder añadido", action.payload);
      let idLastElement = 0;
      //Se obtiene el id del ultimo elemento
      if (state.folders.length === 0) {
        idLastElement = 0;
      } else {
        state.folders.forEach((folder) => {
          ids.push(folder.id);
        });

        idLastElement = Math.max(...ids);
      }

      /*
      if (state.folders.length === 1) {
        idLastElement = 1;
      }
      if (state.folders.length >= 2) {
        idLastElement = state.folders[state.folders.length - 1].id;
      }*/

      // Add a new document in collection "cities"
      setDoc(doc(db, "Folders", `${action.payload}`), {
        id: idLastElement + 1,
        Nombre: `${action.payload}`,
        Categorias: [],
      });

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
      console.log("Se borro el folder", action.payload);

      deleteDoc(doc(db, "Folders", `${action.payload}`));

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

      console.log(randomColor());

      console.log(
        "Se agrego categoria (reducer)",
        action.payload.Nombre,
        "En la vista:",
        action.payload.View
      );

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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

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
      console.log("La categoria fue borrada");

      console.log(state.folders);
      console.log(action.payload.Nombre);

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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

      return {
        folders: state.folders.map((folder) => {
          console.log(folder);
          console.log(action.payload.View);

          console.log(folder.Categorias);
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
      console.log(
        "Se edito la categoria:",
        action.payload.Name,
        "a",
        action.payload.New_name,
        "en la vista",
        action.payload.View
      );

      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        console.log(folder);
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              console.log(folder.Categorias);
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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

      console.log("Así quedo el nombre editado", clone);

      return {
        folders: clone,
      };
    }

    case TYPES.ADD_PRODUCT: {
      console.log(
        "se agregó el producto:",
        action.payload.Product,
        "En la categoria:",
        action.payload.Category,
        "de la vista:",
        action.payload.View
      );

      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        console.log(folder);
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              console.log(folder.Categorias);
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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

      return {
        folders: clone,
      };
    }

    case TYPES.DELETE_PRODUCT: {
      console.log(
        "se eliminó el producto:",
        action.payload.Product,
        "En la categoria:",
        action.payload.Category,
        "de la vista:",
        action.payload.View
      );

      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        console.log(folder);
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              console.log(folder.Categorias);
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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

      console.log("Así quedó clone", clone);

      return {
        folders: clone,
      };
    }

    case TYPES.EDIT_PRODUCT: {
      console.log(
        "El nuevo producto es:",
        action.payload.New_Product,
        "del producto antiguo es",
        action.payload.Product,

        "de la categoria",
        action.payload.Category,

        "de la vista",
        action.payload.View
      );

      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        console.log(folder);
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              console.log(folder.Categorias);
              return Object.keys(categoria)[0] === action.payload.Category
                ? Object.values(categoria)[0].Productos.map((producto) => {
                    console.log(producto);
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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });

      console.log("Así quedó clone", clone);

      return {
        folders: clone,
      };
    }

    case TYPES.EDIT_NOTE: {
      console.log(
        "La nueva nota es:",
        action.payload.Note,
        "del producto",
        action.payload.Product,

        "de la categoria",
        action.payload.Category,

        "de la vista",
        action.payload.View
      );

      let clone = structuredClone(state.folders);

      clone.map((folder) => {
        console.log(folder);
        return folder.Nombre === action.payload.View
          ? folder.Categorias.map((categoria) => {
              console.log(folder.Categorias);
              return Object.keys(categoria)[0] === action.payload.Category
                ? Object.values(categoria)[0].Productos.map((producto) => {
                    console.log(producto);
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

      const folderRef = doc(db, "Folders", action.payload.View);
      setDoc(folderRef, { Categorias: categorias }, { merge: true });
      console.log("Así quedó clone", clone);

      return {
        folders: clone,
      };
    }

    case CHANGES.CHANGE_MODE: {
      console.log("se cambio el tema");
      console.log(action.payload);
      const folderRef = doc(db, "Darkmode", "mode");
      setDoc(folderRef, { darkmode: action.payload });

      return state;
    }

    default:
      return state;
  }
}
