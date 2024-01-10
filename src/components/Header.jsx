import { useContext } from "react";
import Tools from "./Tools";
import { ThemeContext } from "../context/themeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={`${theme.darkmode ? "dark" : "light"}`}>
      <div className={`content-title ${theme.darkmode ? "dark" : "light"}`}>
        <div className="image">
          <img src="./invent.png" alt="Despensa" />
        </div>
        <div className="title">
          <h2>INVENTARIO</h2>
        </div>
      </div>
      <Tools />
    </header>
  );
}
