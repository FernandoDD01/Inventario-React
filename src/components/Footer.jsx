import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={`${theme.darkmode ? "dark" : "light"}`}>
      <div>
        © Todos los derechos reservados por
        <i> Fernando Enrique Alvarado Bolaños</i>
      </div>
      <div>Febrero 2024</div>
      <div>Versión 2.0.0</div>
    </footer>
  );
}
