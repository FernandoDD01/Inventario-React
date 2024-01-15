import { createContext, useContext, useReducer, useState } from "react";
import { FoldersContext } from "./foldersContext";

const viewInitialState = { view: "Bienvenida" };

export const ViewContext = createContext(viewInitialState);

export const ViewProvider = ({ children }) => {
  const { folders } = useContext(FoldersContext);

  let initial_folder = [];
  let initial_view = "";
  folders.forEach((folder) => {
    initial_folder.push(folder.Nombre);
  });

  console.log(initial_folder);
  if (initial_folder.length === 0) {
    initial_view = { view: "Bienvenida" };
  } else {
    initial_view = { view: `${initial_folder[initial_folder.length - 1]}` };
  }
  const [view, setView] = useState(initial_view);

  const handleView = (new_view) => {
    console.log("La vista se cambio a", new_view);
    setView({ view: `${new_view}` });
  };
  return (
    <ViewContext.Provider value={{ ...view, handleView }}>
      {children}
    </ViewContext.Provider>
  );
};
