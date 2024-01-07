import { createContext, useReducer, useState } from "react";

const viewInitialState = { view: "Bienvenida" };

export const ViewContext = createContext(viewInitialState);

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState(viewInitialState);

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
