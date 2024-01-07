import { useContext } from "react";
import { FoldersContext } from "../context/foldersContext";
import { ViewContext } from "../context/viewContext";

export default function Dashboard() {
  const { folders } = useContext(FoldersContext);

  const { view } = useContext(ViewContext);

  console.log(view);

  const filterCategories = (folders) => {
    if (folders == undefined) {
      return;
    }
    return folders.find((folder) => {
      return folder.Nombre === view;
    });
  };

  const filteredCategories = filterCategories(folders);
  console.log(view);
  return (
    <>
      {view === "Bienvenida" ? (
        <h3>Bienvenid@</h3>
      ) : (
        <>
          <div className="add-category" title="Agregar categoría">
            <i className="bx bx-plus bx-lg"></i>
          </div>
          <div>{filteredCategories.Nombre}</div>
        </>
      )}
    </>
  );
}
