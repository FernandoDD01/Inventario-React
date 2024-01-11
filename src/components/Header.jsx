import { useContext } from "react";
import Tools from "./Tools";
import { ThemeContext } from "../context/themeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={`${theme.darkmode ? "dark" : "light"}`}>
      <Tools />
    </header>
  );
}
