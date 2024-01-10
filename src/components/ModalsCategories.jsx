import { useContext } from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from "../context/themeContext";

export function ModalAddCategory({
  children,
  isActiveModalAddCategory,
  closeModalAddCategory,
  resetWarnings,
}) {
  const { theme } = useContext(ThemeContext);
  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-add-category  ${
        isActiveModalAddCategory && "active"
      }`}
      id="overlay"
      onClick={() => {
        closeModalAddCategory();
        resetWarnings();
      }}
    >
      <div
        className={`popup popup-add-category ${
          theme.darkmode ? "dark" : "light"
        } ${isActiveModalAddCategory && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-category">
          <div className="close-window-add-folder">
            <i
              className="bx bx-x"
              onClick={() => {
                closeModalAddCategory();
                resetWarnings();
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

export function ModalDeleteCategory({ children, isActiveModalDeleteCategory }) {
  const { theme } = useContext(ThemeContext);

  const handleModalClick = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-delete-folder  ${
        isActiveModalDeleteCategory && "active"
      }`}
      id="overlay"
    >
      <div
        className={`popup popup-delete-folder ${
          theme.darkmode ? "dark" : "light"
        } ${isActiveModalDeleteCategory && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-delete-folder">{children}</div>
      </div>
    </div>,

    document.getElementById("modal")
  );
}

export function ModalEditCategory({
  children,
  isActiveModalEditCategory,
  closeModalEditCategory,
  resetWarningsEditCategory,
}) {
  const { theme } = useContext(ThemeContext);

  const handleModalClick = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-edit-category  ${
        isActiveModalEditCategory && "active"
      }`}
      id="overlay"
      onClick={() => {
        closeModalEditCategory();
        resetWarningsEditCategory();
      }}
    >
      <div
        className={`popup popup-edit-category ${
          theme.darkmode ? "dark" : "light"
        } ${isActiveModalEditCategory && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-edit-category">
          <div className="close-window-add-folder">
            <i
              className="bx bx-x bx-md"
              onClick={() => {
                closeModalEditCategory();
                resetWarningsEditCategory();
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
