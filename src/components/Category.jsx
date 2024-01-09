import { useContext, useState } from "react";
import Products from "./Products";
import { FoldersContext } from "../context/foldersContext";
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
  const { folders, addProduct, editCategory } = useContext(FoldersContext);

  const [isActiveModalAddProduct, openModalAddProduct, closeModalAddProduct] =
    useModal(false);

  const [
    isActiveModalEditCategory,
    openModalEditCategory,
    closeModalEditCategory,
  ] = useModal(false);

  const [dropdown, setdropdown] = useState(true);

  const [inputNewProduct, setInputNewProduct] = useState({
    Nombre: "",
    Cantidad: 1,
    Precio: 0,
    Enlace: "",
    Nota: "",
  });

  const [inputEditCategory, setInputEditCategory] = useState({ Nombre: "" });

  const [warningAddProduct, setWarningAddProduct] = useState({
    void: false,
    duplicate: false,
    withSpaces: false,
    cero: false,
    negative: false,
  });

  const [warningEditCategory, setWarningEditCategory] = useState({
    void: false,
    duplicate: false,
    withSpaces: false,
    cero: false,
    negative: false,
  });

  const handleChange = (e) => {
    setInputNewProduct({
      ...inputNewProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEdit = (e) => {
    setInputEditCategory({
      ...inputEditCategory,
      [e.target.name]: e.target.value,
    });
  };

  const modifyDropdown = (e) => {
    //Se modifica el estado del dropdown

    if (products.length !== 0 && dropdown === false) {
      setdropdown(true);

      e.target.parentNode.parentNode.style.borderBottomLeftRadius = "0px";
      e.target.parentNode.parentNode.style.borderBottomRightRadius = "0px";
    } else {
      setdropdown(false);

      e.target.parentNode.parentNode.style.borderBottomLeftRadius = "20px";
      e.target.parentNode.parentNode.style.borderBottomRightRadius = "20px";
    }

    //despues el estilo de los contenedores
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputNewProduct.Nombre === "") {
      setWarningAddProduct({ ...warningAddProduct, void: true });
      return;
    }

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

    closeModalAddProduct();

    console.log(foundCategory);

    addProduct(inputNewProduct, categoryName, view);
  };

  const handleSubmitEditCategory = (e) => {
    e.preventDefault();

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
    console.log(Object.keys(findfolder.Categorias));
    console.log(findName);

    if (findName === true) {
      setWarningEditCategory({ ...warningEditCategory, duplicate: true });
      return;
    }

    if (inputEditCategory.Nombre.includes(" ")) {
      setWarningEditCategory({ ...warningEditCategory, withSpaces: true });
      return;
    }

    closeModalEditCategory();

    editCategory(categoryName, inputEditCategory.Nombre, view);
    resetWarningsEditCategory();
  };

  const resetWarnings = () => {
    setInputNewProduct({
      Nombre: "",
      Cantidad: 0,
      Precio: 0,
      Enlace: "",
      Nota: "",
    });
    setWarningAddProduct({
      void: false,
      duplicate: false,
      withSpaces: false,
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
            backgroundColor: `${color}`,
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

            <i className="bx bx-square bx-md marcar"></i>
            <i className="bx bx-sort-a-z bx-md ordenar"></i>
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
              El nombre ya esta en uso
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

          <div className="cuantificador">
            {warningAddProduct.negative === true && (
              <p
                className="adver-product"
                style={{ display: "block", fontSize: "12px", color: "red" }}
              >
                La cantidad no puede ser menor que 1
              </p>
            )}
            <input
              type="number"
              className="input-new-cantidad"
              placeholder="Cantidad"
              name="Cantidad"
              onChange={handleChange}
              value={inputNewProduct.Cantidad}
              min={1}
            />

            <select name="" id="">
              <option value="Pza">Pza</option>
              <option value="Kg">Kg</option>
              <option value="Lt">Lt</option>
              <option value="Paq">Paq</option>
            </select>
          </div>
          <p
            className="adver-nombre"
            style={{ display: "none", fontSize: "12px", Color: "red" }}
          >
            El precio es un campo obligatorio
          </p>
          <input
            type="number"
            className="input-new-precio"
            placeholder="Precio"
            name="Precio"
            onChange={handleChange}
            value={inputNewProduct.Precio}
            min={0}
          />
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
              El nombre ya esta en uso
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
