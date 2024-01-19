import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import GraphicCircle from "./GraphicCircle";

import { CountUp } from "use-count-up";
import { FoldersContext } from "../context/foldersContext";
import GraphicCircleIndividual from "./GraphicCircleIndividual";

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
            total_price +=
              parseFloat(producto.Precio) * parseFloat(producto.Cantidad);
            total_products += parseFloat(producto.Cantidad);
          });
        }
      });
    }
  });

  console.log(total_products);

  let productos_categoria = 0;
  let precio_categoria = 0;

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

        <section className="general-graphic">
          <div className="title-general-graphic">Gráfica general</div>

          <div className="graphic-donute">
            <GraphicCircle
              folders={folders}
              total_price={total_price}
            ></GraphicCircle>
          </div>
        </section>
        <section className="data-table">
          <div className="title-table">Folders:</div>
          <div className="tables">
            {folders.length === 0 ? (
              <div className="void-folders">No hay folders</div>
            ) : (
              folders.map((folder, index) => {
                return (
                  <div key={index} className="conjunto-row-graphic">
                    <div key={index} className="row-table">
                      <div className="row-name">{`Folder: ${folder.Nombre}`}</div>
                      {folder.Categorias.length === 0 ? (
                        <div className="category-data">No tiene categorias</div>
                      ) : (
                        folder.Categorias.map((categoria, index) => {
                          productos_categoria = 0;
                          precio_categoria = 0;
                          return (
                            <div key={index} className="category-data">
                              <div className="category-name">{`Categoría: ${
                                Object.keys(categoria)[0]
                              }`}</div>

                              {Object.values(categoria)[0].Productos.forEach(
                                (producto) => {
                                  productos_categoria += parseFloat(
                                    producto.Cantidad
                                  );

                                  precio_categoria +=
                                    parseFloat(producto.Cantidad) *
                                    parseFloat(producto.Precio);
                                }
                              )}

                              <div className="products-on-category">
                                {`No. de productos: ${productos_categoria}`}
                              </div>
                              <div className="price-of-category">
                                {`Subtotal: ${precio_categoria.toLocaleString(
                                  "es-MX",
                                  {
                                    style: "currency",
                                    currency: "MXN",
                                  }
                                )}`}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="graphic">
                      <GraphicCircleIndividual
                        folders={folders}
                        folderName={folder.Nombre}
                      ></GraphicCircleIndividual>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
