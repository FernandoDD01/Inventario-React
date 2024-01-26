import { createContext, useContext, useReducer, useState } from "react";
import { FoldersContext } from "./foldersContext";

/*Este contexto nos permite saber que folder estamos viendo,
 dependiendo de este, es la información que se visualizará
 */

//Por defecto el estado inicial es "Bienvenida" (Que es la vista cuando no hay ningun folder)
const viewInitialState = { view: "Bienvenida" };

export const ViewContext = createContext(viewInitialState);

export const ViewProvider = ({ children }) => {
  const { folders } = useContext(FoldersContext);

  let initial_folder = [];
  let initial_view = "";
  folders.forEach((folder) => {
    initial_folder.push(folder.Nombre);
  });

  //Si de la consulta a la base de datos ya hay folders que cambia la vista al último folder creado,
  //si no, se mantiene la vista "Bienvenida"
  if (initial_folder.length === 0) {
    initial_view = { view: "Bienvenida" };
  } else {
    initial_view = { view: `${initial_folder[initial_folder.length - 1]}` };
  }
  const [view, setView] = useState(initial_view);

  //Permite cambiar la vista (folder que se esta visualizando)
  const handleView = (new_view) => {
    setView({ view: `${new_view}` });
  };
  return (
    <ViewContext.Provider value={{ ...view, handleView }}>
      {children}
    </ViewContext.Provider>
  );
};
