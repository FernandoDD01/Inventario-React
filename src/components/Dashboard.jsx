import { useContext, useState } from "react";
import { FoldersContext } from "../context/foldersContext";
import { ViewContext } from "../context/viewContext";
import { ThemeContext } from "../context/themeContext";

import Category from "./Category";
import { ModalAddCategory, ModalDeleteCategory } from "./ModalsCategories";
import useModal from "../hooks/useModal";
import { ModalList } from "./ModalList";

export default function Dashboard() {
  //Traemos los contextos de los folders y de la vista
  const { folders, addFolder, deleteFolder, addCategory, deleteCategory } =
    useContext(FoldersContext); //En los folders se encuentra la data principal
  const { view } = useContext(ViewContext); //en la vista esta el folder en el que nos encontramos actualmente
  const { theme } = useContext(ThemeContext);
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

  const [isActiveModalList, openModalList, closeModalList] = useModal(false);

  const [warningAddCategory, setWarningAddCategory] = useState({
    void: false,
    duplicate: false,
    withSpaces: false,
  });

  console.log(folders);

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

  const getTotal = () => {
    let total = 0;

    console.log(filteredCategories.Categorias);

    if (filteredCategories.Categorias.length === 0) {
      return 0;
    } else {
      filteredCategories.Categorias.forEach((categoria) => {
        if (Object.values(categoria)[0].Productos.length === 0) {
          total += 0;
        } else {
          Object.values(categoria)[0].Productos.forEach((producto) => {
            total +=
              parseFloat(producto.Cantidad) * parseFloat(producto.Precio);
          });
        }
      });
    }

    return total;
  };

  const handleListItem = (e) => {
    if (e.target.classList.contains("bx-circle")) {
      e.target.classList.remove("bx-circle");
      e.target.classList.add("bx-check-circle");
      e.target.parentNode.parentNode.querySelector(
        ".nombre-producto-lista"
      ).style.textDecoration = "line-through";
      e.target.parentNode.parentNode.querySelector(
        ".cantidad-producto-lista"
      ).style.textDecoration = "line-through";
      e.target.parentNode.parentNode.querySelector(
        ".precio-producto-lista"
      ).style.textDecoration = "line-through";
      e.target.parentNode.parentNode.style.backgroundColor =
        "rgba(18, 78, 0,0.5)";
    } else {
      e.target.classList.add("bx-circle");
      e.target.classList.remove("bx-check-circle");
      e.target.parentNode.parentNode.querySelector(
        ".nombre-producto-lista"
      ).style.textDecoration = "none";
      e.target.parentNode.parentNode.querySelector(
        ".cantidad-producto-lista"
      ).style.textDecoration = "none";
      e.target.parentNode.parentNode.querySelector(
        ".precio-producto-lista"
      ).style.textDecoration = "none";
      e.target.parentNode.parentNode.style.backgroundColor = "transparent";
    }
  };

  return (
    <>
      {view === "Bienvenida" ? (
        <h3>Bienvenid@</h3>
      ) : (
        <>
          <div
            className={`add-category ${theme.darkmode ? "dark" : "light"}`}
            title="Agregar categoría"
          >
            <div
              className="conjunto-add-category"
              onClick={openModalAddCategory}
            >
              <i className="bx bx-plus bx-md"></i> <div>Agregar Categoría</div>
            </div>

            <div className="conjunto-list-mode" onClick={openModalList}>
              <i className="bx bx-list-check bx-md"></i> <div>Modo lista</div>
            </div>
          </div>

          {/* <div>{filteredCategories.Nombre}</div>*/}

          {console.log(filteredCategories.Categorias)}
          <div className={`content ${theme.darkmode ? "dark" : "light"}`}>
            <div className="sub-content">
              {Object.keys(filteredCategories.Categorias).length === 0 ? (
                <div className="empty-category">Sin registros</div>
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
            </div>
          </div>

          <div className={`total-content ${theme.darkmode ? "dark" : "light"}`}>
            <div
              className={`total-sub-content ${
                theme.darkmode ? "dark" : "light"
              }`}
            >
              <div className="total">
                TOTAL:
                {getTotal().toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                })}
              </div>
            </div>
          </div>
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
          Desea eliminar la categoría: {selectDeleteCategory}
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
      <ModalList isActiveModalList={isActiveModalList}>
        <div className="close-window-add-folder">
          <i
            className="bx bx-x bx-md"
            onClick={() => {
              closeModalList();
            }}
          ></i>
        </div>
        <div>
          <h2>Lista de compras</h2>
        </div>
        <div className="lista-content-lista">
          {view === "Bienvenida" ? (
            <div>No tiene productos</div>
          ) : (
            <>
              {filteredCategories.Categorias.map((categoria, index) => {
                return (
                  <>
                    <div key={index} className="categoria-list">
                      {Object.keys(categoria)[0]}
                    </div>
                    {console.log(categoria)}
                    {Object.values(categoria)[0].Productos.length === 0 ? (
                      <div>No tiene productos</div>
                    ) : (
                      Object.values(categoria)[0].Productos.map(
                        (producto, index) => {
                          return (
                            <div
                              key={index}
                              className={`producto-list ${
                                theme.darkmode ? "dark" : "light"
                              }`}
                            >
                              <div className="btn-tachar">
                                <i
                                  className="bx bx-circle bx-sm tachar"
                                  onClick={handleListItem}
                                ></i>
                              </div>
                              <div className="nombre-producto-lista">
                                {producto.Nombre}
                              </div>
                              <div className="cantidad-producto-lista">
                                {producto.Cantidad}
                                {producto.Unidad}
                              </div>
                              <div className="precio-producto-lista">
                                {producto.Precio.toLocaleString("es-MX", {
                                  style: "currency",
                                  currency: "MXN",
                                })}
                              </div>
                            </div>
                          );
                        }
                      )
                    )}
                  </>
                );
              })}
              <div className="total-list-content">
                <div className="total-list">
                  Total:
                  {getTotal().toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </ModalList>
    </>
  );
}
