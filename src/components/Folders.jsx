export default function Folders() {
  return (
    <div className="folders">
      <div className="folder folder-primario">
        <div className="nom-folder">Inventario 1</div>
        <div className="delete-folder"></div>
        <div className="ref-folder" style={{ display: "none" }}>
          1
        </div>
      </div>
      <div className="add-folder">
        <i className="bx bx-plus"></i>
      </div>
    </div>
  );
}
