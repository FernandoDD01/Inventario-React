import { useContext } from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from "../context/themeContext";

export function ModalAddFolder({
  children,
  isActiveModalAddFolder,
  closeModalAddFolder,
  resetWarnings,
}) {
  const { theme } = useContext(ThemeContext);
  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-add-folder  ${
        isActiveModalAddFolder && "active"
      } `}
      id="overlay"
      onClick={() => {
        resetWarnings();
        closeModalAddFolder();
      }}
    >
      <div
        className={`popup popup-add-folder ${
          theme.darkmode ? "dark" : "light"
        } ${isActiveModalAddFolder && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-add-folder">
          <div className="close-window-add-folder">
            <i
              className="bx bxs-message-square-x"
              onClick={() => {
                resetWarnings();

                closeModalAddFolder();
              }}
            ></i>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export function ModalDeleteFolder({ children, isActiveModalDeleteFolder }) {
  const handleModalClick = (e) => e.stopPropagation();
  const { theme } = useContext(ThemeContext);
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-delete-folder ${
        isActiveModalDeleteFolder && "active"
      }`}
      id="overlay"
    >
      <div
        className={`popup popup-delete-folder ${
          theme.darkmode ? "dark" : "light"
        } ${isActiveModalDeleteFolder && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-delete-folder">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
