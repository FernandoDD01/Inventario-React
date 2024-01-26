import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { Link, NavLink } from "react-router-dom";

export default function Aside() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`aside ${theme.darkmode ? "dark" : "light"}`}>
      <div className="content-title">
        <div className="imagen">
          <img src="public/invent.png" alt="Invent" />
        </div>
        <div className="title">Inventario</div>
      </div>

      <nav className="navbar">
        <div className="menu nav-item">
          <div className="title-nav">Menú</div>
          <div className="list-nav">
            <NavLink
              to="/inventario"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <div className="menu-item">
                <i className="bx bx-folder-open bx-sm"></i>Inventario
              </div>
            </NavLink>

            <NavLink
              to="/estadisticas"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <div className="menu-item">
                <i className="bx bxs-pie-chart-alt-2 bx-sm"></i>Estadísticas
              </div>
            </NavLink>

            <NavLink
              to="/guia"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <div className="menu-item">
                <i className="bx bx-receipt bx-sm"></i>Guía de uso
              </div>
            </NavLink>
          </div>
        </div>
        <div className="profile nav-item">
          <div className="title-nav">Perfil</div>
          <div className="list-nav">
            <NavLink
              to="/ajustes"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <div className="menu-item">
                <i className="bx bx-cog bx-sm"></i> Ajustes
              </div>
            </NavLink>

            <div className="menu-item">
              <i className="bx bx-log-out bx-sm"></i> Cerrar sesión
            </div>
          </div>
        </div>

        <div className="importante">
          <b>Importante:</b> Al ser esta una versión pública la información no
          se guardará en la base de datos.
        </div>
        <div className="contact">
          <div className="title-nav">Contacto</div>

          <div className="contact-item">
            <i>Fernando Enrique Alvarado Bolaños</i>
          </div>

          <div className="contact-item">
            <i>fealvarado07@gmail.com</i>
          </div>

          <div className="contact-icons contact-item">
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
      </nav>
    </div>
  );
}
