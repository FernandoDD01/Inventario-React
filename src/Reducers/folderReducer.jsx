import { TYPES } from "../actions/folderActions";
import Product from "../components/Product";

export function folderReducer(state, action) {
  console.log(state);
  switch (action.type) {
    case TYPES.ADD_FOLDER: {
      console.log("Folder añadido", action.payload);
      let idLastElement = 0;
      //Se obtiene el id del ultimo elemento
      if (state.folders.length === 0) {
        idLastElement = 0;
      }

      if (state.folders.length === 1) {
        idLastElement = 1;
      }
      if (state.folders.length >= 2) {
        idLastElement = state.folders[state.folders.length - 1].id;
      }

      return {
        folders: [
          ...state.folders,
          {
            Nombre: `${action.payload}`,
            Categorias: {},
            id: idLastElement + 1,
          },
        ],
      };
    }

    case TYPES.DELETE_FOLDER: {
      console.log("Se borro el folder", action.payload);

      //Posibilidad de que se re acomoden los id

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

      return {
        folders: state.folders.map((folder) => {
          return folder.Nombre === action.payload.View
            ? {
                ...folder,
                Categorias: [
                  ...folder.Categorias,
                  {
                    [`${action.payload.Nombre}`]: {
                      Color: randomColor(),
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

      console.log(
        state.folders
          .find((folder) => {
            return folder.Nombre === action.payload.View;
          })
          .Categorias.filter((categoria) => {
            return Object.keys(categoria)[0] !== action.payload.Nombre;
          })
      );

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

      console.log("Así quedó clone", clone);

      return {
        folders: clone,
      };
    }

    default:
      return state;
  }
}
