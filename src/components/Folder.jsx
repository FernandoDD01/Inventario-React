export default function Folder({
  folderName,
  changeView,
  openModalDeleteFolder,
  setClickDelFolder,
}) {
  //           className="bx bxs-message-square-x"
  const handleFolderClick = (e) => e.stopPropagation();

  return (
    <>
      <div className="folder folder-primario" onClick={changeView}>
        <div className="nom-folder">{folderName}</div>
        <div className="delete-folder" onClick={handleFolderClick}>
          <i
            className="bx bxs-message-square-x"
            onClick={() => {
              openModalDeleteFolder();
              setClickDelFolder(folderName);
            }}
          ></i>
        </div>
      </div>
    </>
  );
}
