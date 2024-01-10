import Product from "./Product";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export default function Products({ categoryName, products, color }) {
  const { theme } = useContext(ThemeContext);

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

  const getSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      subtotal += parseFloat(product.Cantidad) * parseFloat(product.Precio);
    });

    return subtotal;
  };

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
      <div
        className={`separador-header ${theme.darkmode ? "dark" : "light"}`}
      ></div>

      {products.map((product, index) => {
        return (
          <Product
            categoryName={categoryName}
            key={index}
            product={product}
          ></Product>
        );
      })}

      <div
        className={`separador-footer ${theme.darkmode ? "dark" : "light"}`}
      ></div>

      <div className="footer-table">
        <div className="nom-reg-foot"></div>
        <div className="cant-reg-foot"></div>
        <div className="precio-reg-foot">
          Sub total{" "}
          {getSubtotal().toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
          <label className="sub-total"></label>
        </div>
      </div>
    </div>
  );
}
