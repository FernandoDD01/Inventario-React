import Product from "./Product";

export default function Products({ products, color }) {
  console.log(products);

  const modifyColorOpacity = (color) => {
    let rgb = color.toString();

    let valores = rgb
      .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
      .split(",");

    // Obtener los valores de rojo, verde y azul
    let rojo = parseInt(valores[0]);
    let verde = parseInt(valores[1]);
    let azul = parseInt(valores[2]);
    let opacidad = "0.3";

    // Construir el nuevo color RGBA
    color = "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";
    return color;
  };

  const new_color = modifyColorOpacity(color);

  return (
    <div
      className="product-list-content"
      style={{ backgroundColor: `${new_color}` }}
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
