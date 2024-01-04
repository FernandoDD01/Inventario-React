import { useContext, useEffect, useReducer, useState } from "react";
import ViewContext from "../context/viewContext";

import Category from "./Category";
import {
  categoriesInitialState,
  categoryReducer,
} from "../Reducers/categoryReducer";

import { TYPES } from "../actions/categoryActions";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import WhithoutRegister from "./WhithoutRegister";
import { ModalAddCategory } from "./ModalsCategories";
import useModal from "../hooks/useModal";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function Dashboard() {
  const { view, handleView } = useContext(ViewContext);
  const [folderCategories, setFolderCategories] = useState({});
  const [thereCategories, setThereCategories] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);
  const [state, dispatch] = useReducer(categoryReducer, categoriesInitialState);
  const { Categories } = state;

  /*Para el control del Modal */

  const [nombreCategory, setNombreCategory] = useState("");
  //const [delFolder, setDelFolder] = useState("");

  const [warnVacio, setWarnVacio] = useState(false);
  const [warnEspacio, setWarnEspacio] = useState(false);
  const [warnNomRepetido, setWarnNomRepetido] = useState(false);

  const [
    isActiveModalAddCategory,
    openModalAddCategory,
    closeModalAddCategory,
  ] = useModal(false);

  ///

  const addCategory = () => {
    let nombreCategories = [];
    document.querySelectorAll(".etiqueta-nombre").forEach((e) => {
      nombreCategories.push(e.textContent);
    });

    console.log(nombreCategories);

    if (nombreCategory === "") {
      setWarnVacio(true);
      return;
    }
    if (nombreCategory.includes(" ")) {
      setWarnEspacio(true);
      return;
    }

    if (!nombreCategory.length === 0) {
      if (nombreCategory.find((nombre) => nombre === nombreCategories)) {
        setWarnNomRepetido(true);
        return;
      }
    }

    setWarnVacio(false);
    setWarnEspacio(false);

    closeModalAddCategory();
    dispatch({ type: TYPES.PRE_CONFIG, payload: view });
    dispatch({ type: TYPES.ADD_CATEGORY, payload: { view, nombreCategory } });
    console.log("Esto es lo que tiene el set", folderCategories);

    Toastify({
      text: `La categoría ${nombreCategory} fue añadida`,
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
    setNombreCategory("");
  };

  const handleChange = (e) => {
    setNombreCategory(e.target.value);
  };

  useEffect(() => {
    console.log(
      "Da esto",
      Categories.find((objeto) => objeto.Nombre === view)
    );
    const getObjeto = () => {
      if (
        view === "Bienvenida" ||
        Categories.find((objeto) => objeto.Categorias === view) === undefined
      ) {
        setThereCategories(false);
      } else {
        setThereCategories(true);
      }
    };

    getObjeto();
    /*let data = [];
    const getViewCategories = async (view) => {
      const docRef = doc(db, "Folders", view);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFolderCategories(docSnap.data());
        setThereCategories(true);

        setDataCategories(data);
      } else {
        // docSnap.data() will be undefined in this case
        setFolderCategories({ Folder: "vacio" });
        setThereCategories(false);

        console.log("No such document!");
      }
    };
    
    getViewCategories(view); */
  }, [view, Categories]);

  return (
    <>
      {!(view == "Bienvenida") && (
        <div className="add-category" title="Agregar categoría">
          <i className="bx bx-plus bx-lg" onClick={openModalAddCategory}></i>
        </div>
      )}

      <div className="content">
        <div className="sub-content">
          {view == "Bienvenida" && <h3>Bienvenid@</h3>}
          {view !== "Bienvenida" &&
          Categories.find((objeto) => objeto.Nombre === view) !== undefined &&
          Object.keys(
            Categories.find((objeto) => objeto.Nombre === view).Categorias
          ).length !== 0
            ? Object.values(
                Categories.find((objeto) => objeto.Nombre === view).Categorias
              ).map((categoria, index) => {
                return (
                  <Category
                    key={index}
                    nombreCategory={
                      Object.keys(
                        Categories.find((objeto) => objeto.Nombre === view)
                          .Categorias
                      )[index]
                    }
                    data={categoria}
                  ></Category>
                );
              })
            : view != "Bienvenida" && <WhithoutRegister />}
        </div>
      </div>

      <div className="total-content">
        <div className="total-sub-content">
          <div className="total"></div>
        </div>
      </div>

      <ModalAddCategory
        isActiveModalAddCategory={isActiveModalAddCategory}
        closeModalAddCategory={closeModalAddCategory}
      >
        <div>
          <h2>Agregar categoría</h2>
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
            Ese nombre ya esta en uso
          </p>
          <input
            type="text"
            className="input-new-category"
            placeholder="Nombre de la categoria"
            id="nombre_categoria"
            name="nombre_categoria"
            value={nombreCategory}
            onChange={handleChange}
          />

          <div className="btn-add-category" onClick={addCategory}>
            Agregar
          </div>
        </form>
      </ModalAddCategory>
    </>
  );
}
