import { useContext, useEffect, useReducer, useState } from "react";
import { ModalEditCategory } from "./ModalsCategories";
import Products from "./Products";

import ViewContext from "../context/viewContext";

import {
  categoriesInitialState,
  categoryReducer,
} from "../Reducers/categoryReducer";

import { TYPES } from "../actions/categoryActions";

import useModal from "../hooks/useModal";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function Category({ nombreCategory, data, handleEdit }) {
  const [state, dispatch] = useReducer(categoryReducer, categoriesInitialState);
  const { Categories } = state;
  const { view, handleView } = useContext(ViewContext);

  /*Para el control del Modal */
  const [editName, setEditName] = useState(nombreCategory);
  const [nombreNuevoCategory, setNombreNuevoCategory] = useState("");

  const [warnVacio, setWarnVacio] = useState(false);
  const [warnEspacio, setWarnEspacio] = useState(false);
  const [warnNomRepetido, setWarnNomRepetido] = useState(false);

  const [
    isActiveModalEditCategory,
    openModalEditCategory,
    closeModalEditCategory,
  ] = useModal(false);

  ///

  const editCategory = () => {
    handleEdit();
    console.log("La categoria se editó en el folder", view);
    let nombreCategories = [];
    document.querySelectorAll(".etiqueta-nombre").forEach((e) => {
      nombreCategories.push(e.textContent);
    });

    console.log(nombreCategories);

    if (nombreNuevoCategory === "") {
      setWarnVacio(true);
      return;
    }
    if (nombreNuevoCategory.includes(" ")) {
      setWarnEspacio(true);
      return;
    }

    if (nombreCategories.length != 0) {
      if (nombreCategories.find((nombre) => nombre === nombreNuevoCategory)) {
        setWarnNomRepetido(true);

        return;
      }
    }
    handleEdit(nombreNuevoCategory, nombreCategory);
    setEditName(nombreNuevoCategory);
    setWarnVacio(false);
    setWarnEspacio(false);

    closeModalEditCategory();

    Toastify({
      text: `El nombre de la categoría cambio a: ${nombreNuevoCategory}`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(102, 69, 7)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    setNombreNuevoCategory("");
  };

  const handleChange = (e) => {
    setNombreNuevoCategory(e.target.value);
  };

  const resetNombreCategory = () => {
    setNombreNuevoCategory("");
    setWarnVacio(false);
    setWarnEspacio(false);
    setWarnNomRepetido(false);
  };

  return (
    <>
      <div className="category-content">
        <div
          className="etiqueta-category"
          style={{ backgroundColor: `${data.Color}` }}
        >
          <div className="toolbar-left">
            <i className="bx bx-chevron-right bx-md desplegar"></i>
            <i className="bx bx-square bx-md marcar"></i>
            <i className="bx bx-sort-a-z bx-md ordenar"></i>
          </div>
          <div className="nombre-categoria">
            <label className="etiqueta-nombre">{editName}</label>
            <div className="edit-category">
              <i
                className="bx bx-edit bx-sm edit"
                onClick={openModalEditCategory}
              ></i>
            </div>
          </div>

          <div className="toolbar-right">
            <i className="bx bx-plus bx-md bx-tada-hover add-product"></i>
            <i className="bx bxs-trash-alt bx-md"></i>
          </div>
        </div>
        <div className="referencia" style={{ display: "none" }}></div>
        <div className="refProduc" style={{ display: "none" }}></div>
        <div className="contenedor-tabla">
          {data.Productos != null && (
            <Products productos={data.Productos} color={data.Color} />
          )}
        </div>
      </div>

      <ModalEditCategory
        isActiveModalEditCategory={isActiveModalEditCategory}
        closeModalEditCategory={closeModalEditCategory}
        resetNombreCategory={resetNombreCategory}
      >
        <div>
          <h2>Editar categoría</h2>
        </div>

        <form action="">
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
            Es el mismo nombre
          </p>
          <input
            type="text"
            className="input-new-edit-category"
            placeholder="Nombre de la categoria"
            id="nombre_nuevo_categoria"
            name="nombre_nuevo_categoria"
            value={nombreNuevoCategory}
            onChange={handleChange}
          />

          <div className="btn-edit-category" onClick={editCategory}>
            Editar
          </div>
        </form>
      </ModalEditCategory>
    </>
  );
}
