import { useState } from "react";

export default function Product({ product }) {
  let { Nombre, Cantidad, Precio, Enlace, Nota } = product;

  return (
    <div className="product-reg-content">
      <div className="referencia_producto" style={{ display: "none" }}></div>
      <div className="tool-product">
        <i className="bx bxs-trash-alt bx-md"></i>
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
          <i className="bx bx-notepad bx-md vacio"></i>
        ) : (
          <i className="bx bxs-notepad bx-md lleno"></i>
        )}
      </div>
    </div>
  );
}
