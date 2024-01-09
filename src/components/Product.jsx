import { useContext, useState } from "react";
import { ModalDeleteProduct, ModalNote } from "./ModalProducts";
import useModal from "../hooks/useModal";
import { ViewContext } from "../context/viewContext";
import { FoldersContext } from "../context/foldersContext";

export default function Product({ categoryName, product }) {
  let { Nombre, Cantidad, Precio, Enlace, Nota } = product;
  const { view } = useContext(ViewContext);
  const { deleteProduct } = useContext(FoldersContext);

  const { editNote } = useContext(FoldersContext);
  const [isActiveModalNote, openModalNote, closeModalNote] = useModal(false);
  const [
    isActiveModalDeleteProduct,
    openModalDeleteProduct,
    closeModalDeleteProduct,
  ] = useModal(false);
  const [note, setNote] = useState(Nota);

  const handleChangeNote = (e) => {
    setNote(`${e.target.value}`);
  };

  const handleSubmitNote = () => {
    editNote(note, Nombre, categoryName, view);
  };

  const handleDeleteProduct = () => {
    deleteProduct(Nombre, categoryName, view);
    closeModalDeleteProduct();
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
          <i className="bx bxs-edit-alt bx-md"></i>
        </div>

        <div className="nom-product">{Nombre}</div>
        <div className="cuantificador-content">
          <div className="cant-product">{Cantidad}</div>
          <div className="space-cuant"></div>
        </div>

        <div className="insertPeso">
          $<div className="precio-product">{Precio}</div>
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
    </>
  );
}
