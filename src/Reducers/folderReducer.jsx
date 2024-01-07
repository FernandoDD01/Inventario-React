import { TYPES } from "../actions/folderActions";

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

    default:
      return state;
  }
}
