import { useContext, useState } from "react";
import { TYPES } from "../actions/folderActions";
import { FoldersContext } from "../context/foldersContext";
import { ViewContext } from "../context/viewContext";
import Folder from "./Folder";
import useModal from "../hooks/useModal";
import { ModalAddFolder, ModalDeleteFolder } from "./ModalsFolders";

export default function Folders() {
  const { folders, addFolder, deleteFolder } = useContext(FoldersContext);
  const { view, handleView } = useContext(ViewContext);
  const [input, setInput] = useState({ Nombre: "" });
  const [clickDelFolder, setClickDelFolder] = useState("");

  const [isActiveModalAddFolder, openModalAddFolder, closeModalAddFolder] =
    useModal(false);

  const [
    isActiveModalDeleteFolder,
    openModalDeleteFolder,
    closeModalDeleteFolder,
  ] = useModal(false);

  const [warningAddFolder, setWarningAddFolder] = useState({
    void: false,
    duplicate: false,
    withSpaces: false,
  });

  console.log(folders);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.Nombre === "") {
      setWarningAddFolder({ ...warningAddFolder, void: true });
      return;
    }

    const findName = folders.find((folder) => {
      return folder.Nombre === input.Nombre;
    });

    if (findName !== undefined) {
      setWarningAddFolder({ ...warningAddFolder, duplicate: true });
      return;
    }

    if (input.Nombre.includes(" ")) {
      setWarningAddFolder({ ...warningAddFolder, withSpaces: true });
      return;
    }

    closeModalAddFolder();

    addFolder(input);

    handleView(input.Nombre);

    setInput({ Nombre: "" });
    setWarningAddFolder({
      void: false,
      duplicate: false,
      withSpaces: false,
    });
  };

  const changeView = (e) => {
    console.log(e.target.textContent);
    handleView(e.target.textContent);
  };

  const selectDeleteFolder = (e) => {
    console.log("el boton tiene la clase:", e.target.id);
    closeModalDeleteFolder();
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
                openModalDeleteFolder={openModalDeleteFolder}
                selectDeleteFolder={selectDeleteFolder}
                setClickDelFolder={setClickDelFolder}
              ></Folder>
            );
          })}
        <div className="add-folder">
          <i className="bx bx-plus" onClick={openModalAddFolder}></i>
        </div>
      </div>

      <ModalAddFolder
        isActiveModalAddFolder={isActiveModalAddFolder}
        closeModalAddFolder={closeModalAddFolder}
      >
        <div>
          <h2>Agregar folder</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {warningAddFolder.void === true && (
            <p
              className="adver-categoria-add-folder"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre es un campo obligatorio
            </p>
          )}

          {warningAddFolder.duplicate === true && (
            <p
              className="adver-categoria-add-folder"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre ya esta en uso
            </p>
          )}

          {warningAddFolder.withSpaces === true && (
            <p
              className="adver-categoria-add-folder"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre no puede contener espacios
            </p>
          )}

          <input
            type="text"
            className="input-new-folder"
            name="Nombre"
            placeholder="Nombre del folder"
            onChange={handleChange}
            value={input.Nombre}
          />

          <button className="btn-add-folder" type="submit">
            Agregar
          </button>
        </form>
      </ModalAddFolder>

      <ModalDeleteFolder isActiveModalDeleteFolder={isActiveModalDeleteFolder}>
        <label className="element-pop-delete">
          Desea eliminar el folder: {clickDelFolder}
        </label>
        <div
          id={`${clickDelFolder}`}
          className="confirm-delete-folder element-pop-delete-folder"
          onClick={selectDeleteFolder}
        >
          Eliminar
        </div>
        <div
          className="cancel-delete-folder element-pop-delete-folder"
          onClick={closeModalDeleteFolder}
        >
          Cancelar
        </div>
      </ModalDeleteFolder>
    </>
  );
}
