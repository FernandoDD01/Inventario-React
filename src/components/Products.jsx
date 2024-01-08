import Product from "./Product";

export default function Products({ products, color }) {
  console.log(products);
  return (
    <div
      className="product-list-content"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="header-table">
        <div className="nom-reg">Producto</div>
        <div className="cant-reg">Cantidad</div>
        <div className="precio-reg">Precio</div>
        <div className="enlace">Enlace</div>
        <div className="nota">Nota</div>
      </div>
      <div className="separador-header"></div>

      {products.map((product) => {
        return <Product product={product}></Product>;
      })}

      <div className="separador-footer"></div>

      <div className="footer-table">
        <div className="nom-reg-foot"></div>
        <div className="cant-reg-foot"></div>
        <div className="precio-reg-foot">
          Sub total $<label className="sub-total"></label>
        </div>
      </div>
    </div>
  );
}
