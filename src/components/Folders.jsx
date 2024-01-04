import { useContext, useReducer, useState } from "react";

import ViewContext from "../context/viewContext";

import { folderInitialState, folderReducer } from "../Reducers/folderReducer";

import { TYPES } from "../actions/folderActions";
import Folder from "./Folder";
import useModal from "../hooks/useModal";
import { ModalAddFolder, ModalDeleteFolder } from "./ModalsFolders";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import CategoryContext from "../context/categoryContext";

export default function Folders() {
  const { view, handleView } = useContext(ViewContext);

  const { auxCategory, handleAuxCategory } = useContext(CategoryContext);

  const [nombreFolder, setNombreFolder] = useState("");
  const [delFolder, setDelFolder] = useState("");

  const [warnVacio, setWarnVacio] = useState(false);
  const [warnEspacio, setWarnEspacio] = useState(false);
  const [warnNomRepetido, setWarnNomRepetido] = useState(false);

  const [isActiveModalAddFolder, openModalAddFolder, closeModalAddFolder] =
    useModal(false);

  const [
    isActiveModalDeleteFolder,
    openModalDeleteFolder,
    closeModalDeleteFolder,
  ] = useModal(false);

  const [state, dispatch] = useReducer(folderReducer, folderInitialState);
  const { Folders } = state;

  const addFolder = () => {
    let nomFolders = [];
    document.querySelectorAll(".nom-folder").forEach((e) => {
      nomFolders.push(e.textContent);
    });

    console.log(nomFolders);

    if (nombreFolder === "") {
      setWarnVacio(true);
      return;
    }
    if (nombreFolder.includes(" ")) {
      setWarnEspacio(true);
      return;
    }

    if (nomFolders.find((nombre) => nombre === nombreFolder)) {
      setWarnNomRepetido(true);
      return;
    }

    setWarnVacio(false);
    setWarnEspacio(false);

    dispatch({ type: TYPES.ADD_FOLDER, payload: nombreFolder });

    closeModalAddFolder();
    setNombreFolder("");
    handleView(nombreFolder);
    Toastify({
      text: `El folder ${nombreFolder} fue creado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const selectDelFolder = (nombre_folder) => {
    setDelFolder(nombre_folder);
  };

  const deleteFolder = (nombreFolder) => {
    handleView("Bienvenida");
    closeModalDeleteFolder();
    setDelFolder("");
    dispatch({ type: TYPES.DELETE_FOLDER, payload: nombreFolder });
    Toastify({
      text: `El folder ${nombreFolder} fue eliminado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(121, 8, 8)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  const handleChange = (e) => {
    setNombreFolder(e.target.value);
  };

  const selectViewFolder = (nombreFolder) => {
    console.log("Se esta viendo el folder:", nombreFolder);
    handleView(nombreFolder);
  };

  return (
    <div className="folders">
      <div
        className="folder folder-primario"
        onClick={() => selectViewFolder("Bienvenida")}
      >
        <div className="nom-folder">Bienvenida</div>
        <div className="delete-folder"></div>
        <div className="ref-folder" style={{ display: "none" }}>
          1
        </div>
      </div>
      {Folders.map((folder, index) => {
        return (
          <Folder
            key={index}
            nombre_folder={folder}
            openModalDeleteFolder={openModalDeleteFolder}
            selectDelFolder={selectDelFolder}
            selectViewFolder={selectViewFolder}
          ></Folder>
        );
      })}
      <div className="add-folder" onClick={openModalAddFolder}>
        <i className="bx bx-plus"></i>
      </div>

      <ModalAddFolder
        isActiveModalAddFolder={isActiveModalAddFolder}
        closeModalAddFolder={closeModalAddFolder}
      >
        <div>
          <h2>Agregar folder</h2>
        </div>
        <form>
          <p
            className="adver-categoria-add-folder"
            style={{
              display: `${warnVacio ? "block" : "none"}`,
              fontSize: "12px",
              color: "red",
            }}
          >
            El nombre es un campo obligatorio
          </p>
          <p
            className="adver-categoria-add-folder"
            style={{
              display: `${warnEspacio ? "block" : "none"}`,
              fontSize: "12px",
              color: "red",
            }}
          >
            No se pueden usar espacios
          </p>
          <p
            className="adver-categoria-add-folder"
            style={{
              display: `${warnNomRepetido ? "block" : "none"}`,
              fontSize: "12px",
              color: "red",
            }}
          >
            Ese nombre ya esta en uso
          </p>
          <input
            type="text"
            className="input-new-folder"
            placeholder="Nombre del folder"
            id="nombre_folder"
            name="nombre_folder"
            value={nombreFolder}
            onChange={handleChange}
          />

          <div className="btn-add-folder" onClick={addFolder}>
            Agregar
          </div>
        </form>
      </ModalAddFolder>
      <ModalDeleteFolder isActiveModalDeleteFolder={isActiveModalDeleteFolder}>
        <label className="element-pop-delete">
          Desea eliminar el folder: {delFolder}
        </label>
        <div
          className="confirm-delete-folder element-pop-delete-folder"
          onClick={() => {
            deleteFolder(delFolder);
          }}
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
    </div>
  );
}
