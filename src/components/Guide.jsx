import { useContext } from "react";
import Dashboard from "./Dashboard";
import Folders from "./Folders";
import { ThemeContext } from "../context/themeContext";
import { Link, NavLink } from "react-router-dom";

export default function Guide() {
  const { theme } = useContext(ThemeContext);

  const handleReturn = () => {
    window.scrollTo(document.documentElement.scrollY, 0);
  };
  return (
    <main className={`${theme.darkmode ? "dark" : "light"}`}>
      <div className="guide">
        <h1>Bienvenid@ a la guía de uso de la aplicación web inventario</h1>
        <section className="fast-start">
          <NavLink to="/inventario">
            <i className="bx bx-run bx-sm"></i>
            <h4>Ir directamente al inventario</h4>
          </NavLink>
        </section>
        <section className="introduction">
          <h3>Introducción</h3>
          <p>
            En esta guía aprenderas paso a paso cómo usar todas las funciones de
            la aplicación web de inventario. Conocerás las secciones que la
            integran y aprenderás a crear folders categorías, agregar productos,
            editar información, usar el modo lista y como visualizar las
            estadísticas de tu inventario.
          </p>
        </section>
        <section className="index-guide">
          <h3>
            <a id="index-guide">Índice</a>{" "}
          </h3>
          <ul>
            <li>
              <a href="#add-folder-guide">Agregar folder</a>
            </li>
            <li>
              <a href="#add-category-guide">Agregar categoría</a>
            </li>
            <li>
              <a href="#edit-category-guide">Editar nombre de la categoría</a>
            </li>
            <li>
              <a href="#add-product-guide">Agregar producto</a>
            </li>
            <li>
              <a href="#edit-product-guide">Editar producto</a>
            </li>
            <li>
              <a href="#edit-note-guide">Edición rápida de nota</a>
            </li>
            <li>
              <a href="#list-mode-guide">Modo lista</a>
            </li>
            <li>
              <a href="#stadistics-guide">Estadísticas</a>
            </li>
          </ul>
        </section>
        <div className="refer" id="add-folder-guide"></div>
        <section className="add-folder-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Agregar folder</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>

          <div className="section-content-guide">
            <p>
              Para agregar un nuevo folder, dirigete a la sección{" "}
              <b>Inventario</b>:
            </p>
            <div className="content-img">
              <img src="/img-guide/inventario.jpg" alt="" />
            </div>

            <p> y haz click en el botón:</p>

            <div className="content-img">
              <div className="content-img">
                <img src="/img-guide/agregar_folder.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <div className="refer" id="add-category-guide"></div>

        <section className="add-category-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Agregar categoría</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>

          <div className="section-content-guide">
            <p>
              Una vez creado un folder preciona el botón
              <b>Agregar Categoría</b>:
            </p>
            <div className="content-img">
              <img src="/img-guide/agregar_categoria.jpg" alt="" />
            </div>

            <p> y elige el nombre que desees para la nueva categoría</p>
            <p>
              Es importante que el nombre de la categoría y el folder no
              contenga espacios y que no se repita con el nombre de otras
              categorías o folders.
            </p>

            <p>Cuando tengas creada la categoría se vera algo así:</p>
            <div className="content-img">
              <img
                src="/img-guide/categoria_vacia.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>Puedes borrar la categoría precionando el botón:</p>

            <div className="content-img">
              <img src="/img-guide/boton_borrar.jpg" alt="" />
            </div>
          </div>
        </section>
        <div className="refer" id="edit-category-guide"></div>
        <section className="add-edit-category-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Editar nombre de la categoría</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>
          <div className="section-content-guide">
            <p>Para editar una categoria debes oprimir el boton:</p>

            <div className="content-img">
              <img src="/img-guide/boton_editar.jpg" alt="" />
            </div>

            <p> que esta a un lado del nombre.</p>
          </div>
        </section>
        <div className="refer" id="add-product-guide"></div>

        <section className="add-add-product-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Agregar producto</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>
          <div className="section-content-guide">
            <p>Para agregar un producto, haz click en el botón: </p>

            <div className="content-img">
              <img src="/img-guide/boton_agregar.jpg" alt="" />
            </div>

            <p>
              Se abrira una ventana donde deberás agregar el nombre del
              producto, cantidad, precio , enlace (opcional) y una nota
              (opcional)
            </p>

            <div className="content-img">
              <img src="/img-guide/agregar_producto.jpg" alt="" />
            </div>

            <p>
              La cantidad puede establecerse en diferentes unidades (Pza, Kg,
              Lt, Paq)
            </p>
            <p>
              En el subtotal se verá reflejado la suma de los precios de los
              productos por sus cantidades, este precio esta dado en pesos
              mexicanos.
            </p>

            <div className="content-img">
              <img
                src="/img-guide/sub_total.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>En el Total, se verá la suma de todos los subtotales.</p>

            <div className="content-img">
              <img
                src="/img-guide/total.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>Puedes borrar el producto haciendo click en el botón:</p>

            <div className="content-img">
              <img src="/img-guide/boton_borrar_producto.jpg" alt="" />
            </div>

            <p>Este se encuentra a un lado del producto que deseas eliminar.</p>
          </div>
        </section>
        <div className="refer" id="edit-product-guide"></div>

        <section className="add-edit-product-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Editar producto</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>
          <div className="section-content-guide">
            <p>Para editar un producto, haz click en el botón:</p>

            <div className="content-img">
              <img
                src="/img-guide/boton_editar_producto.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>Este se encuentra a un lado del producto que deseas editar.</p>
          </div>
        </section>
        <div className="refer" id="edit-note-guide"></div>

        <section className="add-edit-note-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Edición rápida de nota</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>
          <div className="section-content-guide">
            <p>
              Puedes visualizar y editar rápidamente la nota del producto
              haciendo click en el botón:
            </p>

            <div className="content-img">
              <img
                src="/img-guide/boton_nota.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>
              Los cambios que se realizen en el area de texto de la nota se
              guardarán automáticamente
            </p>

            <p>
              Cuando el producto tenga alguna nota escrita, el icono cambiara a
              la siguiente forma:
            </p>

            <div className="content-img">
              <img
                src="/img-guide/nota_llena.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </section>
        <div className="refer" id="list-mode-guide"></div>

        <section className="add-list-mode-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Modo lista</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>
          <div className="section-content-guide">
            <p>
              Si deseas visualizar los productos en el modo lista de compras haz
              click en el botón:
            </p>

            <div className="content-img">
              <img
                src="/img-guide/modo_lista.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>
              El <b>modo lista de compras </b> es una funcionalidad que permite
              visualizar aquellos productos de un folder en un listado, en ella
              podrás marcar o desmarcar los productos que ya hayas adquirido
            </p>

            <div className="content-img">
              <img
                src="/img-guide/lista_compras.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </section>
        <div className="refer" id="stadistics-guide"></div>

        <section className="add-stadistics-guide">
          <div className="subtitle-guide">
            <div>
              <h3>Estadísticas</h3>
            </div>
            <div>
              <h4>
                <a className="btn-return" onClick={handleReturn}>
                  Regresar al índice
                </a>
              </h4>
            </div>
          </div>
          <div className="section-content-guide">
            <p>
              Si deseas visualizar las estadísticas de tu inventario dirigite a
              la sección:
            </p>
            <div className="content-img">
              <img
                src="/img-guide/estadisticas.jpg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </div>

            <p>
              En esa sección prodrás visualizar información relevante de tu
              inventario, como el precio de todo el inventario, la cantidad
              total de todos tus productos, tu producto más caro, etc.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
