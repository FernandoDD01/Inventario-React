import { createContext, useReducer, useState } from "react";
import { mode } from "../firebase/firebase";
import { folderReducer } from "../Reducers/folderReducer";
import { CHANGES } from "../actions/darkmodeActions";

const themeInitialState = mode;

console.log(themeInitialState);

export const ThemeContext = createContext(themeInitialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeInitialState);
  const [state, dispatch] = useReducer(folderReducer);

  console.log(theme);

  const handleTheme = () => {
    console.log(theme);
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
