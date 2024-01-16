import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import GraphicCircle from "./GraphicCircle";

import { CountUp } from "use-count-up";
import { FoldersContext } from "../context/foldersContext";

export default function Stadistics() {
  const { theme } = useContext(ThemeContext);
  const { folders } = useContext(FoldersContext);

  let total_price = 0;
  let total_products = 0;

  console.log(folders);

  folders.forEach((folder) => {
    if (folder.Categorias.length === 0) {
      total_price += 0;
      total_products += 0;
    } else {
      folder.Categorias.forEach((categoria) => {
        if (Object.values(categoria)[0].Productos.length === 0) {
          total_price += 0;
          total_products += 0;
        } else {
          Object.values(categoria)[0].Productos.forEach((producto) => {
            total_price += parseFloat(producto.Precio);
            total_products += parseFloat(producto.Cantidad);
          });
        }
      });
    }
  });

  console.log(total_products);

  return (
    <main className={`${theme.darkmode ? "dark" : "light"}`}>
      <div className="content-stadistics">
        <h1>Estadísticas</h1>

        <section className="total-inventary">
          <div className="conjunto-total-price">
            <div className="title-total-price">Costo total del inventario:</div>
            <div className="total-price">
              <i className="bx bx-money bx-md"></i>
              <CountUp
                isCounting
                end={total_price}
                duration={1}
                formatter={(value) =>
                  value.toLocaleString("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  })
                }
              />
            </div>
          </div>

          <div className="conjunto-total-products">
            <div className="title-total-products">Total de productos:</div>
            <div className="total-products">
              <i className="bx bxs-purchase-tag bx-md"></i>
              <CountUp
                isCounting
                end={total_products}
                duration={1}
                formatter={(value) => parseInt(value).toLocaleString()}
              />
            </div>
          </div>
        </section>

        <section className="pie">
          <GraphicCircle></GraphicCircle>
        </section>
      </div>
    </main>
  );
}
