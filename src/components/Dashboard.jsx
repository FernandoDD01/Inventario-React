import { useContext } from "react";
import { FoldersContext } from "../context/foldersContext";
import { ViewContext } from "../context/viewContext";

export default function Dashboard() {
  const { folders } = useContext(FoldersContext);

  const { view } = useContext(ViewContext);

  console.log(view);

  const filterCategories = (folders) => {
    if (folders == undefined) {
      return;
    }
    return folders.find((folder) => {
      return folder.Nombre === view;
    });
  };

  const filteredCategories = filterCategories(folders);

  return (
    <>
      {view === "Bienvenida" ? (
        <h3>Bienvenid@</h3>
      ) : (
        <>
          <div className="add-category" title="Agregar categoría">
            <i className="bx bx-plus bx-lg"></i>
          </div>

          {/* <div>{filteredCategories.Nombre}</div>*/}

          {console.log(filteredCategories.Categorias)}

          {Object.keys(filteredCategories.Categorias).length === 0 ? (
            <div className="content">
              <div className="sub-content">
                <div className="empty-category">Sin registros 😢</div>
              </div>
            </div>
          ) : (
            filteredCategories.Categorias.map((categoria, index) => {
              return (
                <div
                  key={index}
                  style={{
                    color: `${categoria[Object.keys(categoria)[0]].Color}`,
                  }}
                >
                  {Object.keys(categoria)[0]}

                  {categoria[Object.keys(categoria)[0]].Productos.length ==
                  0 ? (
                    <p>No tiene productos</p>
                  ) : (
                    categoria[Object.keys(categoria)[0]].Productos.map(
                      (producto) => {
                        return <div>{Object.keys(producto)[0]}</div>;
                      }
                    )
                  )}
                </div>
              );
            })
          )}
        </>
      )}
    </>
  );
}
