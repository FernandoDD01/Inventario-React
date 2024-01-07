import React from "react";

export default function Category({ color, categoryName, products }) {
  console.log(color);
  console.log(categoryName);
  console.log(products);

  return (
    <div className="category-content">
      <div
        className="etiqueta-category "
        style={{ backgroundColor: `${color}` }}
      >
        <div className="toolbar-left">
          <i className="bx bx-chevron-right bx-md desplegar"></i>

          <i className="bx bx-square bx-md marcar"></i>
          <i className="bx bx-sort-a-z bx-md ordenar"></i>
        </div>
        <div className="nombre-categoria">
          <label className="etiqueta-nombre">{categoryName}</label>
          <div className="edit-category">
            <i className="bx bx-edit bx-sm"></i>
          </div>
        </div>

        <div className="toolbar-right">
          <i className="bx bx-plus bx-md bx-tada-hover add-product"></i>
          <i className="bx bxs-trash bx-md bx-tada-hover delete"></i>
        </div>
      </div>
      <div className="referencia" style={{ display: "none" }}>
        {categoryName}
      </div>
      <div className="refProduc" style={{ display: "none" }}></div>
      <div className="contenedor-tabla">
        {products.length == 0 ? (
          <p>No tiene productos</p>
        ) : (
          products.map((producto) => {
            return <div>{Object.keys(producto)[0]}</div>;
          })
        )}
      </div>
    </div>
  );
}
