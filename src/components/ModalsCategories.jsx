import ReactDOM from "react-dom";

export function ModalAddCategory({
  children,
  isActiveModalAddCategory,
  closeModalAddCategory,
}) {
  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-add-category ${
        isActiveModalAddCategory && "active"
      }`}
      id="overlay"
      onClick={closeModalAddCategory}
    >
      <div
        className={`popup popup-add-category ${
          isActiveModalAddCategory && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-category">
          <div className="close-window-add-folder">
            <i
              className="bx bxs-message-square-x"
              onClick={closeModalAddCategory}
            ></i>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export function ModalEditCategory({
  children,
  isActiveModalEditCategory,
  closeModalEditCategory,
  resetNombreCategory,
}) {
  const handleModalClick = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-edit-category ${
        isActiveModalEditCategory && "active"
      }`}
      id="overlay"
      onClick={() => {
        closeModalEditCategory();
        resetNombreCategory();
      }}
    >
      <div
        className={`popup popup-edit-category ${
          isActiveModalEditCategory && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-edit-category">
          <i
            className="bx bxs-message-square-x"
            onClick={() => {
              closeModalEditCategory();
              resetNombreCategory();
            }}
          ></i>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
