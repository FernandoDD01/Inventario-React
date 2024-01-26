import { createContext, useReducer, useState } from "react";
import { mode } from "../firebase/firebase";
import { folderReducer } from "../Reducers/folderReducer";
import { CHANGES } from "../actions/darkmodeActions";

//Este contexto maneja el estado de Tema (darkmode)

//El estao inicial es el que se obtiene de hacer la consulta a la base de datos
const themeInitialState = mode;

console.log(themeInitialState);

export const ThemeContext = createContext(themeInitialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeInitialState);
  const [state, dispatch] = useReducer(folderReducer);

  const handleTheme = () => {
    //Si darkmode es true se cambiara a false y se ejecutara la acción de cambiar de modo,
    // y si es false se pasara a false y se ejecutara la acción de cambiar modo

    if (theme.darkmode === true) {
      setTheme({ darkmode: false });
      dispatch({ type: CHANGES.CHANGE_MODE, payload: false });
    } else {
      setTheme({ darkmode: true });
      dispatch({ type: CHANGES.CHANGE_MODE, payload: true });
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
