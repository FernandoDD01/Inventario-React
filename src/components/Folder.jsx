export default function Folder({
  nombre_folder,
  openModalDeleteFolder,
  selectDelFolder,
}) {
  return (
    <div className="folder folder-primario">
      <div className="nom-folder">{nombre_folder}</div>
      <div className="delete-folder">
        <i
          className="bx bxs-message-square-x"
          onClick={() => {
            openModalDeleteFolder();
            selectDelFolder(nombre_folder);
          }}
        ></i>
      </div>
      <div className="ref-folder" style={{ display: "none" }}>
        1
      </div>
    </div>
  );
}
