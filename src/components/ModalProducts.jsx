import ReactDOM from "react-dom";

export function ModalAddProduct({
  children,
  isActiveModalAddProduct,
  closeModalAddProduct,
  resetWarnings,
}) {
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
          isActiveModalAddProduct && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-product">
          <div className="close-window-product">
            <i
              className="bx bxs-message-square-x"
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
  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay  ${isActiveModalDeleteProduct && "active"}`}
      id="overlay"
      onClick={closeModalDeleteProduct}
    >
      <div
        className={`popup  ${isActiveModalDeleteProduct && "active"}`}
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
        className={`popup popup-nota ${isActiveModalNote && "active"}`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-product">
          <div className="close-window-nota">
            <i
              className="bx bxs-message-square-x"
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
