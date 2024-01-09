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
