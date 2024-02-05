import { useContext, useState } from "react";
import Products from "./Products";
import { FoldersContext } from "../context/foldersContext";
import { ThemeContext } from "../context/themeContext";

import { ModalAddProduct } from "./ModalProducts";
import useModal from "../hooks/useModal";
import { ModalEditCategory } from "./ModalsCategories";

export default function Category({
  color,
  categoryName,
  products,
  handleSelectDeleteCategory,
  view,
  openModalDeleteCategory,
}) {
  const { theme } = useContext(ThemeContext); //Treamos el estado de theme de ThemeContext (Con esto determinamos que estilos usar)

  const { folders, addProduct, editCategory } = useContext(FoldersContext); //Traemos del FolderContext el estado de los folders y las funciones addProduct y editCategory

  const [isActiveModalAddProduct, openModalAddProduct, closeModalAddProduct] =
    useModal(false); //Con este custom Hook  manejamos si esta activa la ventana modal (Agregar producto) y cuando la abrimos y la cerramos, el valor inicial es "false" (ventana modal desactivada).

  const [
    isActiveModalEditCategory,
    openModalEditCategory,
    closeModalEditCategory,
  ] = useModal(false); //Con este custom Hook  manejamos si esta activa la ventana modal (Editar categoría) y cuando la abrimos y la cerramos, el valor inicial es "false" (ventana modal desactivada).

  const [dropdown, setdropdown] = useState(true); //con este useState manejamos el estado del despliegue de cada categoría, el valor inicial es true (desplegado)

  const [inputNewProduct, setInputNewProduct] = useState({
    //Con este useState manejamos los imputs del modal agregar Producto
    Nombre: "",
    Cantidad: 1,
    Unidad: "Pza",
    Precio: 0,
    Enlace: "",
    Nota: "",
  });

  const [inputEditCategory, setInputEditCategory] = useState({ Nombre: "" }); //Con este useState manejamos los imputs del modal Editar Categoría

  const [warningAddProduct, setWarningAddProduct] = useState({
    // Con este useState manejamos los warnings de los imputs del modal Agregar producto
    void: false,
    duplicate: false,
    withSpaces: false,
    cero: false,
    negative: false,
    negativePrice: false,
    voidQuantity: false,
    voidPrice: false,
  });

  const [warningEditCategory, setWarningEditCategory] = useState({
    // Con este useState manejamos los warnings de los imputs del modal Editar categoría
    void: false,
    duplicate: false,
    withSpaces: false,
    cero: false,
    negative: false,
  });

  const modifyColor = () => {
    //Esta funcion nos permite modificar la opacidad de un color para que haya una diferencia entre el encabezado de la categoría y la lista de productos
    if (theme.darkmode) {
      let new_color = color;

      let rgb = new_color.toString();

      let valores = rgb
        .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
        .split(",");

      // Obtener los valores de rojo, verde y azul
      let rojo = parseInt(valores[0]);
      let verde = parseInt(valores[1]);
      let azul = parseInt(valores[2]);
      let opacidad = "0.6";

      // Construir el nuevo color RGBA
      let nuevoColor =
        "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";
      return nuevoColor;
    } else {
      return color;
    }
  };

  const handleChange = (e) => {
    //Cambia el estado del input con el nuevo valor que se ingresa en cada campo del modal Agregar Producto
    setInputNewProduct({
      ...inputNewProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEdit = (e) => {
    //Cambia el estado del input con el nuevo valor que se ingresa en cada campo del modal Editar Categoría
    setInputEditCategory({
      ...inputEditCategory,
      [e.target.name]: e.target.value,
    });
  };

  const modifyDropdown = (e) => {
    //Se modifica el estado del dropdown y se aplican estilos diferentes dependiendo si hay o no productos

    if (products.length !== 0 && dropdown === false) {
      setdropdown(true);

      e.target.parentNode.parentNode.style.borderBottomLeftRadius = "0px";
      e.target.parentNode.parentNode.style.borderBottomRightRadius = "0px";
    } else {
      setdropdown(false);

      e.target.parentNode.parentNode.style.borderBottomLeftRadius = "20px";
      e.target.parentNode.parentNode.style.borderBottomRightRadius = "20px";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Verificamos que se cunplan cada una de la especificaciones de la información, sino activamos el warning correspondiente
    if (inputNewProduct.Nombre === "") {
      setWarningAddProduct({ ...warningAddProduct, void: true });
      return;
    }

    if (inputNewProduct.Cantidad === "") {
      setWarningAddProduct({ ...warningAddProduct, voidQuantity: true });
      return;
    }

    if (inputNewProduct.Precio === "") {
      setWarningAddProduct({ ...warningAddProduct, voidPrice: true });
      return;
    }

    if (parseFloat(inputNewProduct.Precio) < 0) {
      setWarningAddProduct({ ...warningAddProduct, negativePrice: true });
      return;
    }

    if (parseFloat(inputNewProduct.Cantidad) < 0.01) {
      setWarningAddProduct({ ...warningAddProduct, negative: true });
      return;
    }

    //Realizamos la verificacion para que el producto no este repetido
    const foundCategory = folders
      .find((folder) => {
        return folder.Nombre === view;
      })
      .Categorias.find((categoria) => {
        return Object.keys(categoria)[0] === categoryName;
      });

    const productsCategory = Object.values(foundCategory);

    const verifyProduct = productsCategory[0].Productos.some((producto) => {
      return producto.Nombre === inputNewProduct.Nombre;
    });

    if (verifyProduct === true) {
      setWarningAddProduct({ ...warningAddProduct, duplicate: true });
      return;
    }

    if (inputNewProduct.Nombre.includes(" ")) {
      setWarningAddProduct({ ...warningAddProduct, withSpaces: true });
      return;
    }

    //Si se cumplieron todas las verificaciones...

    closeModalAddProduct(); //Cerramos el modal

    addProduct(inputNewProduct, categoryName, view); //Mandamos a llamar la función para agregar productos y pasamos como paramentro el nuevo producto, el nombre de la categoría y el nombre del folder en el que nos encontramos
    resetWarnings(); // Reseteamos los warnings
  };

  const handleSubmitEditCategory = (e) => {
    e.preventDefault();

    //Verificamos que se cunplan cada una de la especificaciones de la información, sino activamos el warning correspondiente
    if (inputEditCategory.Nombre === "") {
      setWarningEditCategory({ ...warningEditCategory, void: true });
      return;
    }

    const findfolder = folders.find((folder) => {
      return folder.Nombre === view;
    });

    const findName = findfolder.Categorias.some((el) => {
      return Object.keys(el)[0] === inputEditCategory.Nombre;
    });

    if (findName === true) {
      setWarningEditCategory({ ...warningEditCategory, duplicate: true });
      return;
    }

    if (inputEditCategory.Nombre.includes(" ")) {
      setWarningEditCategory({ ...warningEditCategory, withSpaces: true });
      return;
    }
    //Si se cumplieron todas las verificaciones...

    closeModalEditCategory(); //Cerramos el modal

    editCategory(categoryName, inputEditCategory.Nombre, view); //Mandamos a llamar la función para editar categoría y pasamos como paramentro el antiguo nombre de la categoría, el nuevo  nombre de la categoría y el nombre del folder en el que nos encontramos
    resetWarningsEditCategory(); //Reseteamos los warinings
  };

  const resetWarnings = () => {
    setInputNewProduct({
      Nombre: "",
      Cantidad: 1,
      Precio: 0,
      Enlace: "",
      Nota: "",
      Unidad: "Pza",
    });
    setWarningAddProduct({
      void: false,
      duplicate: false,
      withSpaces: false,
      cero: false,
      negative: false,
      negativePrice: false,
      voidQuantity: false,
      voidPrice: false,
    });
  };

  const resetWarningsEditCategory = () => {
    setInputEditCategory({ Nombre: "" });
    setWarningEditCategory({
      void: false,
      duplicate: false,
      withSpaces: false,
    });
  };

  return (
    <>
      <div className="category-content">
        <div
          className={`etiqueta-category ${dropdown ? "active" : "close"}`}
          style={{
            backgroundColor: `${modifyColor()}`,
            borderBottomLeftRadius: `${
              dropdown && products.length !== 0 ? "0px" : "20px"
            }`,
            borderBottomRightRadius: `${
              dropdown && products.length !== 0 ? "0px" : "20px"
            }`,
          }}
        >
          <div className="toolbar-left">
            <i
              className={`bx ${
                products.length !== 0 && dropdown
                  ? "bx-chevron-down"
                  : "bx-chevron-right"
              } bx-md desplegar`}
              onClick={modifyDropdown}
            ></i>
            {/* <i className="bx bx-square bx-md marcar"></i>
            <i className="bx bx-sort-a-z bx-md ordenar"></i>*/}
          </div>
          <div className="nombre-categoria">
            <label className="etiqueta-nombre">{categoryName}</label>
            <div className="edit-category">
              <i
                className="bx bx-edit bx-sm"
                onClick={openModalEditCategory}
              ></i>
            </div>
          </div>

          <div className="toolbar-right">
            <i
              className="bx bx-plus bx-md bx-tada-hover add-product"
              onClick={openModalAddProduct}
            ></i>
            <i
              className="bx bxs-trash bx-md bx-tada-hover delete"
              onClick={() => {
                openModalDeleteCategory();
                handleSelectDeleteCategory(categoryName);
              }}
            ></i>
          </div>
        </div>
        <div className="referencia" style={{ display: "none" }}>
          {categoryName}
        </div>
        <div className="refProduc" style={{ display: "none" }}></div>
        <div className={`contenedor-tabla ${dropdown ? "active" : "close"}`}>
          {products.length !== 0 && (
            <Products
              categoryName={categoryName}
              products={products}
              color={color}
            ></Products>
          )}
        </div>
      </div>

      <ModalAddProduct
        isActiveModalAddProduct={isActiveModalAddProduct}
        closeModalAddProduct={closeModalAddProduct}
        resetWarnings={resetWarnings}
      >
        <div>
          <h2>Agregar producto</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {warningAddProduct.void === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre es un campo obligatorio
            </p>
          )}
          {warningAddProduct.duplicate === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre ya está en uso
            </p>
          )}
          {warningAddProduct.withSpaces === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre no puede contener espacios
            </p>
          )}
          <input
            type="text"
            className="input-new-product"
            placeholder="Nombre del producto"
            name="Nombre"
            onChange={handleChange}
            value={inputNewProduct.Nombre}
          />
          {warningAddProduct.negative === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              La cantidad no puede ser menor que 0.01
            </p>
          )}
          {warningAddProduct.voidQuantity === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              La cantidad es un campo obligatorio
            </p>
          )}

          <div className="cuantificador">
            <p>Cantidad:</p>
            <input
              type="number"
              className="input-new-cantidad"
              placeholder="Cantidad"
              name="Cantidad"
              onChange={handleChange}
              value={inputNewProduct.Cantidad}
            />

            <select
              name="Unidad"
              id=""
              onChange={handleChange}
              value={inputNewProduct.Unidad}
            >
              <option value="Pza">Pza</option>
              <option value="Kg">Kg</option>
              <option value="Lt">Lt</option>
              <option value="Paq">Paq</option>
            </select>
          </div>
          {warningAddProduct.negativePrice === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El precio no puede ser menor que
            </p>
          )}
          {warningAddProduct.voidPrice === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El precio es un campo obligatorio
            </p>
          )}

          <div className="precio">
            <p style={{ margin: "0px 0px 5px 0px" }}>Precio:</p>
            <input
              type="number"
              className="input-new-precio"
              placeholder="Precio"
              name="Precio"
              onChange={handleChange}
              value={inputNewProduct.Precio}
            />
          </div>

          <input
            type="text"
            className="input-new-enlace"
            placeholder="Enlace"
            name="Enlace"
            onChange={handleChange}
            value={inputNewProduct.Enalce}
          />
          <textarea
            className="input-new-nota"
            id=""
            cols="10"
            rows="10"
            placeholder="Nota..."
            name="Nota"
            onChange={handleChange}
            value={inputNewProduct.Nota}
          ></textarea>
          <button className="btn-add-product" type="submit">
            Agregar
          </button>
        </form>
      </ModalAddProduct>

      <ModalEditCategory
        isActiveModalEditCategory={isActiveModalEditCategory}
        closeModalEditCategory={closeModalEditCategory}
        resetWarningsEditCategory={resetWarningsEditCategory}
      >
        <div>
          <h2>Editar categoría</h2>
        </div>

        <form onSubmit={handleSubmitEditCategory}>
          {warningEditCategory.void === true && (
            <p
              className="adver-categoria"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre es un campo obligatorio
            </p>
          )}

          {warningEditCategory.duplicate === true && (
            <p
              className="adver-categoria"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre ya está en uso
            </p>
          )}

          {warningEditCategory.withSpaces === true && (
            <p
              className="adver-categoria"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre no puede contener espacios
            </p>
          )}
          <input
            type="text"
            className="input-new-edit-category"
            placeholder="Nuevo nombre de la categoria"
            name="Nombre"
            onChange={handleChangeEdit}
            value={inputEditCategory.Nombre}
          />

          <button className="btn-edit-category" type="submit">
            Editar
          </button>
        </form>
      </ModalEditCategory>
    </>
  );
}
