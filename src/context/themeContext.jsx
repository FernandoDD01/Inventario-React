import { createContext, useState } from "react";

const themeInitialState = { darkmode: false };

export const ThemeContext = createContext(themeInitialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeInitialState);

  console.log(theme);

  const handleTheme = () => {
    console.log(theme);
    if (theme.darkmode === true) {
      setTheme({ darkmode: false });
    } else {
      setTheme({ darkmode: true });
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
