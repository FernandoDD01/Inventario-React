import { useContext, useState } from "react";
import {
  ModalDeleteProduct,
  ModalEditProduct,
  ModalNote,
} from "./ModalProducts";
import useModal from "../hooks/useModal";
import { ViewContext } from "../context/viewContext";
import { FoldersContext } from "../context/foldersContext";

export default function Product({ categoryName, product }) {
  let { Nombre, Cantidad, Unidad, Precio, Enlace, Nota } = product;
  const { view } = useContext(ViewContext);
  const { folders, deleteProduct, editProduct, editNote } =
    useContext(FoldersContext);

  const [isActiveModalNote, openModalNote, closeModalNote] = useModal(false);
  const [
    isActiveModalDeleteProduct,
    openModalDeleteProduct,
    closeModalDeleteProduct,
  ] = useModal(false);

  const [
    isActiveModalEditProduct,
    openModalEditProduct,
    closeModalEditProduct,
  ] = useModal(false);
  const [note, setNote] = useState(Nota);

  console.log(Nota);
  const [inputEditProduct, setInputEditProduct] = useState(product);

  const [warningEditProduct, setWarningEditProduct] = useState({
    void: false,
    duplicate: false,
    withSpaces: false,
    cero: false,
    negative: false,
    negativePrice: false,
    voidQuantity: false,
    voidPrice: false,
  });

  const handleChangeNote = (e) => {
    setNote(`${e.target.value}`);
  };

  const handleChangeEditProduct = (e) => {
    setInputEditProduct({
      ...inputEditProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitNote = () => {
    editNote(note, Nombre, categoryName, view);
  };

  const handleDeleteProduct = () => {
    deleteProduct(Nombre, categoryName, view);
    closeModalDeleteProduct();
  };

  const handleSubmitEditProduct = (e) => {
    e.preventDefault();

    if (parseFloat(inputEditProduct.Precio) < 0) {
      setWarningEditProduct({ ...warningEditProduct, negativePrice: true });
      return;
    }

    if (parseFloat(inputEditProduct.Cantidad) < 1) {
      setWarningEditProduct({ ...warningEditProduct, negative: true });
      return;
    }

    if (inputEditProduct.Cantidad === "") {
      setWarningEditProduct({ ...warningEditProduct, voidQuantity: true });
      return;
    }
    if (inputEditProduct.Precio === "") {
      setWarningEditProduct({ ...warningEditProduct, voidPrice: true });
      return;
    }

    if (inputEditProduct.Nombre === "") {
      setWarningEditProduct({ ...warningEditProduct, void: true });
      return;
    }

    if (inputEditProduct.Nombre.includes(" ")) {
      setWarningEditProduct({ ...warningEditProduct, withSpaces: true });
      return;
    }

    closeModalEditProduct();
    editProduct(Nombre, inputEditProduct, categoryName, view);

    resetWarningsEditProduct();
  };

  const resetWarningsEditProduct = () => {
    setWarningEditProduct({
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

  const resetInputEditProduct = () => {
    setInputEditProduct(product);
  };

  return (
    <>
      <div className="product-reg-content">
        <div className="referencia_producto" style={{ display: "none" }}></div>
        <div className="tool-product">
          <i
            className="bx bxs-trash-alt bx-md"
            onClick={openModalDeleteProduct}
          ></i>
          <i
            className="bx bxs-edit-alt bx-md"
            onClick={openModalEditProduct}
          ></i>
        </div>

        <div className="nom-product">{Nombre}</div>
        <div className="cuantificador-content">
          <div className="cant-product">{Cantidad}</div>
          <div className="space-cuant">{Unidad}</div>
        </div>

        <div className="insertPeso">
          <div className="precio-product">
            {Precio.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </div>
        </div>

        <div className="enlace-product">
          <a href={Enlace} target="_blank" rel="noreferrer">
            {Enlace}
          </a>
        </div>
        <div className="nota-product">
          {Nota === "" ? (
            <i
              className="bx bx-notepad bx-md vacio"
              onClick={openModalNote}
            ></i>
          ) : (
            <i
              className="bx bxs-notepad bx-md lleno"
              onClick={openModalNote}
            ></i>
          )}
        </div>
      </div>

      <ModalNote
        isActiveModalNote={isActiveModalNote}
        closeModalNote={closeModalNote}
        handleSubmitNote={handleSubmitNote}
      >
        <div>
          <h2>Nota</h2>
        </div>
        <div className="lista-content"></div>

        <textarea
          cols="15"
          rows="5"
          className="nota-content"
          placeholder="No hay notas"
          value={note}
          onChange={handleChangeNote}
        ></textarea>
      </ModalNote>

      <ModalDeleteProduct
        isActiveModalDeleteProduct={isActiveModalDeleteProduct}
        closeModalDeleteProduct={closeModalDeleteProduct}
      >
        <label className="element-pop">
          Desea eliminar el producto:{Nombre}
        </label>
        <div
          className="confirm-delete element-pop"
          onClick={handleDeleteProduct}
        >
          Eliminar
        </div>
        <div className="cancel element-pop" onClick={closeModalDeleteProduct}>
          Cancelar
        </div>
      </ModalDeleteProduct>

      <ModalEditProduct
        isActiveModalEditProduct={isActiveModalEditProduct}
        closeModalEditProduct={closeModalEditProduct}
        resetWarningsEditProduct={resetWarningsEditProduct}
        resetInputEditProduct={resetInputEditProduct}
      >
        <div>
          <h2>Editar Producto</h2>
        </div>

        <form onSubmit={handleSubmitEditProduct}>
          {warningEditProduct.void === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre es un campo obligatorio
            </p>
          )}

          {warningEditProduct.withSpaces === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El nombre no puede contener espacios
            </p>
          )}
          <input
            type="text"
            className="input-new-product-edit"
            placeholder="Nombre del producto"
            name="Nombre"
            value={inputEditProduct.Nombre}
            onChange={handleChangeEditProduct}
          />
          {warningEditProduct.negative === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              La cantidad no puede ser menor que 1
            </p>
          )}

          {warningEditProduct.voidQuantity === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              La cantidad es un campo obligatorio
            </p>
          )}
          <div className="cuantificador-edit">
            <input
              type="number"
              className="input-new-cantidad-edit"
              placeholder="Cantidad"
              name="Cantidad"
              value={inputEditProduct.Cantidad}
              onChange={handleChangeEditProduct}
            />

            <select
              name="Unidad"
              id=""
              className="select-cantidad-edit"
              value={inputEditProduct.Unidad}
              onChange={handleChangeEditProduct}
            >
              <option value="Pza">Pza</option>
              <option value="Kg">Kg</option>
              <option value="Lt">Lt</option>
              <option value="Paq">Paq</option>
            </select>
          </div>

          {warningEditProduct.negativePrice === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El precio no puede ser menor que 0
            </p>
          )}

          {warningEditProduct.voidPrice === true && (
            <p
              className="adver-product"
              style={{ display: "block", fontSize: "12px", color: "red" }}
            >
              El precio es un campo obligatorio
            </p>
          )}

          <input
            type="number"
            className="input-new-precio-edit"
            placeholder="Precio"
            name="Precio"
            value={inputEditProduct.Precio}
            onChange={handleChangeEditProduct}
          />
          <input
            type="text"
            className="input-new-enlace-edit"
            placeholder="Enlace"
            name="Enlace"
            value={inputEditProduct.Enlace}
            onChange={handleChangeEditProduct}
          />
          <textarea
            className="input-new-nota-edit"
            id=""
            cols="10"
            rows="10"
            placeholder="Nota..."
            name="Nota"
            value={inputEditProduct.Nota}
            onChange={(e) => {
              handleChangeEditProduct(e);
              handleChangeNote(e);
            }}
          ></textarea>

          <button className="btn-edit-product" type="submit">
            Editar
          </button>
        </form>
      </ModalEditProduct>
    </>
  );
}
