import { useContext } from "react";

import { ViewContext } from "../context/viewContext";
import { ThemeContext } from "../context/themeContext";

export default function Folder({
  folderName,
  changeView,
  openModalDeleteFolder,
  setClickDelFolder,
}) {
  //           className="bx bxs-message-square-x"
  const handleFolderClick = (e) => e.stopPropagation();

  const { view } = useContext(ViewContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`folder folder-primario ${
          view === folderName && "visible"
        } ${theme.darkmode ? "dark" : "light"}`}
        onClick={changeView}
      >
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
