import { useContext } from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from "../context/themeContext";

export function ModalAddProduct({
  children,
  isActiveModalAddProduct,
  closeModalAddProduct,
  resetWarnings,
}) {
  const { theme } = useContext(ThemeContext);
  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-add-product ${
        isActiveModalAddProduct && "active"
      }`}
      id="overlay"
      onClick={() => {
        closeModalAddProduct();
        resetWarnings();
      }}
    >
      <div
        className={`popup popup-add-product ${
          theme.darkmode ? "dark" : "light"
        } ${isActiveModalAddProduct && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-product">
          <div className="close-window-product">
            <i
              className="bx bx-x"
              onClick={() => {
                closeModalAddProduct();
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

export function ModalDeleteProduct({
  children,
  isActiveModalDeleteProduct,
  closeModalDeleteProduct,
}) {
  const { theme } = useContext(ThemeContext);

  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay  ${isActiveModalDeleteProduct && "active"}`}
      id="overlay"
      onClick={closeModalDeleteProduct}
    >
      <div
        className={`popup  ${theme.darkmode ? "dark" : "light"} ${
          isActiveModalDeleteProduct && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop">{children}</div>
      </div>
    </div>,

    document.getElementById("modal")
  );
}

export function ModalNote({
  children,
  isActiveModalNote,
  closeModalNote,
  handleSubmitNote,
}) {
  const { theme } = useContext(ThemeContext);

  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-nota ${isActiveModalNote && "active"}`}
      id="overlay"
      onClick={() => {
        closeModalNote();

        handleSubmitNote();
      }}
    >
      <div
        className={`popup popup-nota ${theme.darkmode ? "dark" : "light"} ${
          isActiveModalNote && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-product">
          <div className="close-window-nota">
            <i
              className="bx bx-x"
              onClick={() => {
                closeModalNote();
                handleSubmitNote();
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

export function ModalEditProduct({
  children,
  isActiveModalEditProduct,
  closeModalEditProduct,
  resetWarningsEditProduct,
  resetInputEditProduct,
}) {
  const { theme } = useContext(ThemeContext);

  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-edit-product ${
        isActiveModalEditProduct && "active"
      }`}
      id="overlay"
      onClick={() => {
        closeModalEditProduct();
        resetWarningsEditProduct();
        resetInputEditProduct();
      }}
    >
      <div
        className={`popup popup-nota ${theme.darkmode ? "dark" : "light"} ${
          isActiveModalEditProduct && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-edit-product">
          <div className="close-window-product-edit">
            <i
              className="bx bx-x"
              onClick={() => {
                closeModalEditProduct();
                resetWarningsEditProduct();
                resetInputEditProduct();
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
