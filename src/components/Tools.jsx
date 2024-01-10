import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function Tools() {
  const { theme, handleTheme } = useContext(ThemeContext);

  return (
    <div className="tools">
      <div className="shop-mode">Modo Lista</div>

      <div
        className={`dark-mode ${theme.darkmode && "active"}`}
        onClick={handleTheme}
      >
        <i
          className={`bx ${theme.darkmode ? "bxs-moon" : "bxs-sun"} bx-md`}
        ></i>
      </div>
      <div className="config" title="Configuración">
        <i className="bx bxs-cog bx-md bx-spin-hover"></i>
      </div>
    </div>
  );
}
