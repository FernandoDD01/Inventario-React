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

/* <div
      className={`overlay overlay-add-folder ${
        isActiveModalAddFolder && "active"
      }`}
      id="overlay"
      onClick={closeModalAddFolder}
    >
      <div
        className={`popup popup-add-folder ${
          isActiveModalAddFolder && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-add-folder">
          <div className="close-window-add-folder">
            <i
              className="bx bxs-message-square-x"
              onClick={closeModalAddFolder}
            ></i>
          </div>
          {children}
        </div>
      </div>
    </div>*/
