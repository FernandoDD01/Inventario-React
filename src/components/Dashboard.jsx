import { useContext, useState } from "react";
import { FoldersContext } from "../context/foldersContext";
import { ViewContext } from "../context/viewContext";

import Category from "./Category";
import { ModalAddCategory, ModalDeleteCategory } from "./ModalsCategories";
import useModal from "../hooks/useModal";

export default function Dashboard() {
  //Traemos los contextos de los folders y de la vista
  const { folders, addFolder, deleteFolder, addCategory, deleteCategory } =
    useContext(FoldersContext); //En los folders se encuentra la data principal
  const { view } = useContext(ViewContext); //en la vista esta el folder en el que nos encontramos actualmente

  const [inputNewCategory, setInputNewCategory] = useState({ Nombre: "" });
  const [selectDeleteCategory, setSelectDeleteCategory] = useState("");
  const [
    isActiveModalAddCategory,
    openModalAddCategory,
    closeModalAddCategory,
  ] = useModal(false);

  const [
    isActiveModalDeleteCategory,
    openModalDeleteCategory,
    closeModalDeleteCategory,
  ] = useModal(false);

  const [warningAddCategory, setWarningAddCategory] = useState({
    void: false,
    duplicate: false,
    withSpaces: false,
  });

  const filterCategories = (folders) => {
    if (folders == undefined) {
      return;
    }
    return folders.find((folder) => {
      return folder.Nombre === view;
    });
  };

  const filteredCategories = filterCategories(folders);

  ///*Para Controlar el input de la nueva categoria

  const handleChange = (e) => {
    setInputNewCategory({
      ...inputNewCategory,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputNewCategory.Nombre === "") {
      setWarningAddCategory({ ...warningAddCategory, void: true });
      return;
    }

    const findfolder = folders.find((folder) => {
      return folder.Nombre === view;
    });

    console.log(findfolder);

    const findName = findfolder.Categorias.some((el) => {
      return Object.keys(el)[0] === inputNewCategory.Nombre;
    });
    console.log(Object.keys(findfolder.Categorias));
    console.log(findName);

    if (findName === true) {
      setWarningAddCategory({ ...warningAddCategory, duplicate: true });
      return;
    }

    if (inputNewCategory.Nombre.includes(" ")) {
      setWarningAddCategory({ ...warningAddCategory, withSpaces: true });
      return;
    }
    closeModalAddCategory();

    addCategory(inputNewCategory, view);

    setInputNewCategory({ Nombre: "" });
    setWarningAddCategory({
      void: false,
      duplicate: false,
      withSpaces: false,
    });
    console.log("Se agregó la categoria", inputNewCategory);
  };

  const resetWarnings = () => {
    setInputNewCategory({ Nombre: "" });
    setWarningAddCategory({
      void: false,
      duplicate: false,
      withSpaces: false,
    });
  };

  const handleSelectDeleteCategory = (nombre) => {
    setSelectDeleteCategory(nombre);
  };

  return (
    <>
      {view === "Bienvenida" ? (
        <h3>Bienvenid@</h3>
      ) : (
        <>
          <div className="add-category" title="Agregar categoría">
            <i className="bx bx-plus bx-lg" onClick={openModalAddCategory}></i>
          </div>

          {/* <div>{filteredCategories.Nombre}</div>*/}

          {console.log(filteredCategories.Categorias)}

          {Object.keys(filteredCategories.Categorias).length === 0 ? (
            <div className="content">
              <div className="sub-content">
                <div className="empty-category">Sin registros 😢</div>
              </div>
            </div>
          ) : (
            filteredCategories.Categorias.map((categoria, index) => {
              return (
                <Category
                  key={index}
                  categoryName={Object.keys(categoria)[0]}
                  color={categoria[Object.keys(categoria)[0]].Color}
                  products={categoria[Object.keys(categoria)[0]].Productos}
                  handleSelectDeleteCategory={handleSelectDeleteCategory}
                  view={view}
                  openModalDeleteCategory={openModalDeleteCategory}
                ></Category>
              );
            })
          )}
        </>
      )}
      <ModalAddCategory
        isActiveModalAddCategory={isActiveModalAddCategory}
        closeModalAddCategory={closeModalAddCategory}
        resetWarnings={resetWarnings}
      >
        <div>
          <h2>Agregar categoría</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {warningAddCategory.void === true && (
            <p
              className="adver-categoria"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre es un campo obligatorio
            </p>
          )}

          {warningAddCategory.duplicate === true && (
            <p
              className="adver-categoria"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre ya esta en uso
            </p>
          )}

          {warningAddCategory.withSpaces === true && (
            <p
              className="adver-categoria"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre no puede contener espacios
            </p>
          )}

          <input
            type="text"
            className="input-new-category"
            name="Nombre"
            placeholder="Nombre de la categoria"
            onChange={handleChange}
            value={inputNewCategory.Nombre}
          />

          <button className="btn-add-category" type="submit">
            Agregar
          </button>
        </form>
      </ModalAddCategory>

      <ModalDeleteCategory
        isActiveModalDeleteCategory={isActiveModalDeleteCategory}
      >
        <label className="element-pop-delete">
          Desea eliminar el folder: Nombre
        </label>
        <div
          className="confirm-delete-folder element-pop-delete-folder"
          onClick={() => {
            deleteCategory(selectDeleteCategory, view);
            closeModalDeleteCategory();
          }}
        >
          Eliminar
        </div>
        <div
          className="cancel-delete-folder element-pop-delete-folder"
          onClick={closeModalDeleteCategory}
        >
          Cancelar
        </div>
      </ModalDeleteCategory>
    </>
  );
}
