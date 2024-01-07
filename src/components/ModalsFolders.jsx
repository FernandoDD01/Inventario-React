import ReactDOM from "react-dom";

export function ModalAddFolder({
  children,
  isActiveModalAddFolder,
  closeModalAddFolder,
}) {
  const handleModalClick = (e) => e.stopPropagation();
  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-add-folder ${
        isActiveModalAddFolder && "active"
      }`}
      id="overlay"
      onClick={() => {
        closeModalAddFolder();
      }}
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
              onClick={() => {
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

  return ReactDOM.createPortal(
    <div
      className={`overlay overlay-delete-folder ${
        isActiveModalDeleteFolder && "active"
      }`}
      id="overlay"
    >
      <div
        className={`popup popup-delete-folder ${
          isActiveModalDeleteFolder && "active"
        }`}
        id="popup"
        onClick={handleModalClick}
      >
        <div className="cont-pop-delete-folder">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
