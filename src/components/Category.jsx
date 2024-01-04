import Products from "./Products";

export default function Category({ nombreCategory, data }) {
  return (
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
          <label className="etiqueta-nombre">{nombreCategory}</label>
          <div className="edit-category">
            <i className="bx bx-edit bx-sm edit"></i>
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
  );
}
