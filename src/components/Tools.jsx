import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function Tools() {
  const { theme, handleTheme } = useContext(ThemeContext);

  const handleCollapse = () => {
    if (document.querySelector(".aside").classList.contains("collapsed")) {
      document.querySelector(".aside").classList.remove("collapsed");
    } else {
      document.querySelector(".aside").classList.add("collapsed");
    }
  };

  return (
    <div className="tools">
      <div className="collapser" onClick={handleCollapse}>
        <i className="bx bx-menu-alt-left bx-md"></i>
      </div>

      <div
        className={`dark-mode ${theme.darkmode && "active"}`}
        onClick={handleTheme}
      >
        <i
          className={`bx ${theme.darkmode ? "bxs-moon" : "bxs-sun"} bx-md`}
        ></i>
      </div>
    </div>
  );
}
