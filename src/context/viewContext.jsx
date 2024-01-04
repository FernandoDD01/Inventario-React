import { createContext, useState } from "react";

const ViewContext = createContext();
const initialView = "Bienvenida";

const ViewProvider = ({ children }) => {
  const [view, setView] = useState(initialView);

  function handleView(nombreFolder) {
    console.log("Se cambio la vista a", nombreFolder);
    setView(nombreFolder);
  }

  const data = { view, handleView };

  return <ViewContext.Provider value={data}>{children}</ViewContext.Provider>;
};

export { ViewProvider };
export default ViewContext;
