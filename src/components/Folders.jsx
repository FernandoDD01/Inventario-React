import { useContext, useState } from "react";
import { TYPES } from "../actions/folderActions";
import { FoldersContext } from "../context/foldersContext";
import { ViewContext } from "../context/viewContext";
import Folder from "./Folder";

export default function Folders() {
  const { folders, addFolder, deleteFolder } = useContext(FoldersContext);
  const { view, handleView } = useContext(ViewContext);
  const [input, setInput] = useState({ Nombre: "" });
  const [filter, setFilter] = useState("Bienvenida");

  console.log(folders);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFolder(input);
    console.log(input);
    handleView(input.Nombre);
  };

  const changeView = (e) => {
    console.log(e.target.textContent);
    handleView(e.target.textContent);
  };

  const selectDeleteFolder = (e) => {
    console.log("el boton tiene la clase:", e.target.id);
    handleView(changeViewDelete(e.target.id));

    deleteFolder(e.target.id);
  };

  const changeViewDelete = (folderName) => {
    console.log(folderName);
    let position = folders.indexOf(
      folders.find((folder) => {
        return folder.Nombre === folderName;
      })
    );
    console.log(position);

    console.log(folders.length);

    return position === 0 && folders.length === 1
      ? "Bienvenida"
      : position === 0
      ? folders[position + 1].Nombre
      : folders[position - 1].Nombre;
  };

  return (
    <>
      <div className="folders">
        <li onClick={changeView}>Bienvenida</li>

        {folders !== undefined &&
          folders.map((folder) => {
            return (
              <Folder
                key={folder.id}
                folderName={folder.Nombre}
                changeView={changeView}
                selectDeleteFolder={selectDeleteFolder}
              ></Folder>
              /*<li key={folder.id}>
                <div onClick={changeView}>{folder.Nombre}</div>

                <button
                  className={`${folder.Nombre}`}
                  onClick={selectDeleteFolder}
                >
                  x
                </button>
              </li>*/
            );
          })}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="Nombre" id="" onChange={handleChange} />
          <button type="submit">Agregar Folder</button>
        </form>
      </div>
    </>
  );
}
