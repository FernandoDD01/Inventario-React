import { useContext } from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from "../context/themeContext";

export function ModalList({ children, isActiveModalList }) {
  const handleModalClick = (e) => e.stopPropagation();
  const { theme } = useContext(ThemeContext);
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-lista ${isActiveModalList && "active"}`}
      id="overlay"
    >
      <div
        className={`popup popup-lista ${theme.darkmode ? "dark" : "light"} ${
          isActiveModalList && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-lista">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
