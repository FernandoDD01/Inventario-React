export default function Folder({ folderName, changeView, selectDeleteFolder }) {
  //           className="bx bxs-message-square-x"
  const handleFolderClick = (e) => e.stopPropagation();

  return (
    <>
      <div className="folder folder-primario" onClick={changeView}>
        <div className="nom-folder">{folderName}</div>
        <div className="delete-folder" onClick={handleFolderClick}>
          <i
            id={`${folderName}`}
            className="bx bxs-message-square-x"
            onClick={selectDeleteFolder}
          ></i>
        </div>
      </div>
    </>
  );
}
