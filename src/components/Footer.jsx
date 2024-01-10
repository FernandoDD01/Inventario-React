import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={`${theme.darkmode ? "dark" : "light"}`}>
      <div>© Todos los derechos reservados</div>
      <div>
        por <i>Fernando Enrique Alvarado Bolaños</i>
      </div>
      <div>Febrero 2024 Versión 2 . 0 . 0</div>
      <div className="contact">
        <p>fealvarado07@gmail.com </p>
        <div className="contact-icons">
          <a
            href="https://github.com/FernandoDD01"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-github bx-md" title="Github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/fernando-enrique-alvarado"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-linkedin-square bx-md" title="Linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
