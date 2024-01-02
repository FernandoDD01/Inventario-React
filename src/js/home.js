///Declaración elementos del DOM///
const d = document,
  $addcategory = d.querySelector(".add-category"),
  $cancel = d.querySelector(".cancel"),
  $confirm_delete = d.querySelector(".confirm-delete"),
  overlay = d.getElementById("overlay"),
  popup = d.getElementById("popup"),
  $overlay_add_category = d.querySelector(".overlay-add-category"),
  $popup_add_category = d.querySelector(".popup-add-category"),
  $overlay_edit_category = d.querySelector(".overlay-edit-category"),
  $popup_edit_category = d.querySelector(".popup-edit-category"),
  $overlay_add_product = d.querySelector(".overlay-add-product"),
  $popup_add_product = d.querySelector(".popup-add-product"),
  $overlay_edit_product = d.querySelector(".overlay-edit-product"),
  $popup_edit_product = d.querySelector(".popup-edit-product"),
  $overlay_nota = d.querySelector(".overlay-nota"),
  $popup_nota = d.querySelector(".popup-nota"),
  $template = d.getElementById("crud-template").content,
  $subcontent = d.querySelector(".sub-content"),
  $fragment = d.createDocumentFragment(),
  $empty_category = d.querySelector(".empty-category"),
  $confirm_add_category = d.querySelector(".btn-add-category"),
  $confirm_add_product = d.querySelector(".btn-add-product"),
  $confirm_edit_category = d.querySelector(".btn-edit-category"),
  $confirm_edit_product = d.querySelector(".btn-edit-product"),
  $confirm_delete_folder = d.querySelector(".confirm-delete-folder"),
  $close_window_delete_folder = d.querySelector(".cancel-delete-folder"),
  $close_window = d.querySelector(".close-window"),
  $close_window_product = d.querySelector(".close-window-product"),
  $close_window_lista = d.querySelector(".close-window-lista"),
  $close_window_product_edit = d.querySelector(".close-window-product-edit"),
  $close_window_nota = d.querySelector(".close-window-nota"),
  $close_window_edit_category = d.querySelector(".close-window-edit-category"),
  $input_new_category = d.querySelector(".input-new-category"),
  $input_new_product_nombre = d.querySelector(".input-new-product"),
  $input_new_product_cantidad = d.querySelector(".input-new-cantidad"),
  $input_new_product_precio = d.querySelector(".input-new-precio"),
  $input_new_product_enlace = d.querySelector(".input-new-enlace"),
  $input_new_product_nota = d.querySelector(".input-new-nota"),
  $select_cantidad = d.querySelector("select"),
  $Total = d.querySelector(".total"),
  $input_new_product_nombre_edit = d.querySelector(".input-new-product-edit"),
  $input_new_product_cantidad_edit = d.querySelector(
    ".input-new-cantidad-edit"
  ),
  $input_new_product_precio_edit = d.querySelector(".input-new-precio-edit"),
  $input_new_product_enlace_edit = d.querySelector(".input-new-enlace-edit"),
  $input_new_product_nota_edit = d.querySelector(".input-new-nota-edit"),
  $select_cantidad_edit = d.querySelector(".select-cantidad-edit"),
  $dark_mode_switch = d.querySelector(".dark-mode"),
  $modo_lista = d.querySelector(".shop-mode"),
  $overlay_lista = d.querySelector(".overlay-lista"),
  $popup_lista = d.querySelector(".popup-lista"),
  $input_new_edit_category = d.querySelector(".input-new-edit-category"),
  $overlay_delete_folder = d.querySelector(".overlay-delete-folder"),
  $popup_delete_folder = d.querySelector(".popup-delete-folder");
///FOLDERS///
let no_inventarios = 1,
  selectfolder = "Inventario 1";
const $overlay_add_folder = d.querySelector(".overlay-add-folder"),
  $popup_add_folder = d.querySelector(".popup-add-folder"),
  $close_window_add_folder = d.querySelector(".close-window-add-folder"),
  $template_folder = d.querySelector(".modelo-folder").content,
  $btn_add_folder = d.querySelector(".add-folder"),
  $folders = d.querySelector(".folders"),
  $confirm_add_folder = d.querySelector(".btn-add-folder"),
  $input_new_folder = d.querySelector(".input-new-folder");

//CONECTAR BASE DE DATOS//

//Credenciales para acceder a la base de datos de firebase
const firebaseConfig = {
  apiKey: "AIzaSyDn18d_jjsEZ0y6mW8DYdffKjn3RLW5uRI",
  authDomain: "despensa-proyect.firebaseapp.com",
  projectId: "despensa-proyect",
  storageBucket: "despensa-proyect.appspot.com",
  messagingSenderId: "649740679881",
  appId: "1:649740679881:web:7856c1221515410a27eb18",
  measurementId: "G-ZCTS7L7NTN",
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig);
// Inicializar Cloud Firestore
const db = firebase.firestore();

/*db.collection(`${selectfolder}`)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data_productos.push(doc.data()["Productos"]);
      data_test.push(doc.data()["Categoria"].nombre);
      data_color.push(doc.data()["Categoria"].color);
    });
    getAllCategories(data_test, data_color, data_productos);
  });*/
let folders = [];
db.collection("Folders")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      folders.push(doc.id);
    });
    loadFolders(folders);
  });

function loadFolders(fol) {
  fol.forEach((e) => {
    let $clone_folder = d.importNode($template_folder, true);
    $clone_folder.querySelector(".delete-folder").appendChild(deleteFolder());
    $clone_folder.querySelector(".ref-folder").textContent = e;
    $clone_folder.querySelector(".nom-folder").textContent = e;

    $folders.appendChild($clone_folder);
  });

  const elementos = document.querySelectorAll(".nom-folder");

  // Accede al último elemento de la lista
  const ultimoElemento = elementos[elementos.length - 1];
  ultimoElemento.click();
}

$btn_add_folder.addEventListener("click", () => {
  no_inventarios++;

  $overlay_add_folder.classList.add("active");
  $popup_add_folder.classList.add("active");
});

$confirm_add_folder.addEventListener("click", () => {
  if (!$input_new_folder.value == "") {
    Toastify({
      text: `El folder ${$input_new_folder.value} fue creado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    $overlay_add_folder.classList.remove("active");
    $popup_add_folder.classList.remove("active");

    let $clone_folder = d.importNode($template_folder, true);
    $clone_folder.querySelector(".delete-folder").appendChild(deleteFolder());
    $clone_folder.querySelector(
      ".ref-folder"
    ).textContent = `${no_inventarios}`;
    $clone_folder.querySelector(".nom-folder").textContent =
      $input_new_folder.value;

    $folders.appendChild($clone_folder);
    selectfolder = $input_new_folder.value;
    // Obtiene todos los elementos que tienen la clase deseada
    const elementos = document.querySelectorAll(".nom-folder");

    // Accede al último elemento de la lista
    const ultimoElemento = elementos[elementos.length - 1];
    ultimoElemento.click();

    db.collection("Folders")
      .doc($input_new_folder.value)
      .set({
        ///Y el objeto que se creo se le asigna el registro categoria en la base de datos
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    d.querySelector(".adver-categoria-add-folder").style.display = "block";
  }

  $input_new_folder.value = "";
});

$close_window_add_folder.addEventListener("click", () => {
  $overlay_add_folder.classList.remove("active");
  $popup_add_folder.classList.remove("active");
});

let FOLDER;

function deleteFolder() {
  const DeleteFolderBtn = d.createElement("i");
  DeleteFolderBtn.classList.add("bx");
  DeleteFolderBtn.classList.add("bxs-message-square-x");

  DeleteFolderBtn.addEventListener("click", (e) => {
    $overlay_delete_folder.classList.add("active");
    $popup_delete_folder.classList.add("active");

    FOLDER = e.target.parentElement.parentNode;
  });
  return DeleteFolderBtn;
}

$confirm_delete_folder.addEventListener("click", () => {
  let nom_folder = FOLDER.querySelector(".nom-folder").textContent;
  Toastify({
    text: `El folder ${nom_folder} fue eliminado`,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "rgb(121, 8, 8)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  db.collection(nom_folder)
    .get()
    .then((querySnapshot) => {
      // Itera sobre cada documento y los borra
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    })
    .then(() => {
      db.collection("Folders")
        .doc(nom_folder)
        .delete()

        .then(() => {
          console.log("Borrado exitosamente");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      // Borrado exitoso
      console.log("Colección borrada exitosamente");
    })
    .catch((error) => {
      // Error al borrar la colección
      console.error("Error borrando colección: ", error);
    });
  FOLDER.remove();
  const elementos = document.querySelectorAll(".nom-folder");

  // Accede al último elemento de la lista
  const ultimoElemento = elementos[elementos.length - 1];
  ultimoElemento.click();

  $overlay_delete_folder.classList.remove("active");
  $popup_delete_folder.classList.remove("active");
});

$close_window_delete_folder.addEventListener("click", () => {
  $overlay_delete_folder.classList.remove("active");
  $popup_delete_folder.classList.remove("active");
});

///

let data_test = [],
  data_color = [],
  data_productos = [],
  confirm_mode = [];

function Mode(mode) {
  if (!(mode[0] == true)) return;
  $dark_mode_switch.classList.add("active");

  $dark_mode_switch.querySelector(".bx").classList.remove("bxs-sun");
  $dark_mode_switch.querySelector(".bx").classList.add("bxs-moon");
  d.querySelector("html").style.backgroundColor = "rgb(32, 32, 36)";
  d.querySelector("body").style.backgroundColor = "rgb(32, 32, 36)";
  d.querySelector("body").style.color = "white";
  d.querySelector("header").style.backgroundColor = "rgb(26, 1, 42)";
  d.querySelectorAll(".folder").forEach((e) => {
    e.style.backgroundColor = "rgb(32, 32, 36)";
    e.style.border = "solid #e2e2e2";
  });
  d.querySelector(".nota-content").style.backgroundColor = "#333";
  d.querySelector(".folders").style.borderBottom = "solid #e2e2e2";
  d.querySelectorAll(".producto-list").forEach((e) => {
    e.style.borderBottom = "solid 1px #e2e2e2";
  });
  d.querySelector(".total-sub-content").style.backgroundColor =
    "rgb(49, 49, 53)";

  d.querySelector("footer").style.backgroundColor = "rgb(29, 1, 48)";

  $popup_add_category.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_edit_category.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_add_product.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_edit_product.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_nota.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_lista.style.backgroundColor = "rgb(32, 32, 36)";
  popup.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_delete_folder.style.backgroundColor = "rgb(32, 32, 36)";
  $popup_add_folder.style.backgroundColor = "rgb(32, 32, 36)";

  ////CAMBIAR COLORES  DE LOS INPUTS///

  d.querySelectorAll("input").forEach((e) => {
    e.style.color = "white";
  });

  d.querySelectorAll("select").forEach((e) => {
    e.style.color = "white";
  });
  d.querySelectorAll("textarea").forEach((e) => {
    e.style.color = "white";
  });

  d.querySelectorAll("textarea").forEach((e) => {
    e.style.border = "2px solid white";
  });
  d.querySelectorAll("select").forEach((e) => {
    e.style.border = "2px solid white";
  });

  d.querySelectorAll("select").forEach((e) => {
    e.style.backgroundColor = "rgb(32, 32, 36)";
  });

  d.querySelectorAll("input").forEach((e) => {
    e.style.border = "2px solid white";
  });

  ////////CAMBIAR OPACIDAD DE ETIQUETAS////////
  d.querySelectorAll(".etiqueta-category").forEach((e) => {
    let new_color = e.style.backgroundColor;

    let rgb = new_color.toString();

    let valores = rgb
      .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
      .split(",");

    // Obtener los valores de rojo, verde y azul
    let rojo = parseInt(valores[0]);
    let verde = parseInt(valores[1]);
    let azul = parseInt(valores[2]);
    let opacidad = "0.5";

    // Construir el nuevo color RGBA
    let nuevoColor =
      "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

    ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia
    e.style.backgroundColor = nuevoColor;
  });
}

$folders.addEventListener("click", (e) => {
  if (e.target.classList.contains("nom-folder") == true) {
    //e.target.parentNode.style.borderBottom = "none";
    selectfolder =
      e.target.parentElement.querySelector(".nom-folder").textContent;
    //console.log(`El folder selecionado es: ${selectfolder}`);
    d.querySelectorAll(".category-content").forEach((e) => {
      e.remove();
    });

    db.collection(`${selectfolder}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data_productos.push(doc.data()["Productos"]);
          data_test.push(doc.data()["Categoria"].nombre);
          data_color.push(doc.data()["Categoria"].color);
        });

        getAllCategories(data_test, data_color, data_productos);
        data_productos = [];
        data_test = [];
        data_color = [];

        Mode(confirm_mode);

        d.querySelectorAll(".folder").forEach((e) => {
          e.style.borderBottom = "solid";
        });
        e.target.parentNode.style.borderBottom = "none";
      });

    d.querySelectorAll(".category-content").forEach((e) => {
      console.log("Hola");
      if (e.querySelector(".referencia").textContent != selectfolder) {
        e.remove();
      }
    });
  }
});

db.collection("Darkmode")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      confirm_mode.push(doc.data().blackmode);
    });
    Mode(confirm_mode);
  });

$dark_mode_switch.addEventListener("click", () => {
  const elementos = document.querySelectorAll(".nom-folder");

  // Accede al último elemento de la lista
  const ultimoElemento = elementos[elementos.length - 1];
  ultimoElemento.click();
  if (!$dark_mode_switch.classList.contains("active")) {
    confirm_mode = [true];
    $dark_mode_switch.classList.add("active");

    $dark_mode_switch.querySelector(".bx").classList.remove("bxs-sun");
    $dark_mode_switch.querySelector(".bx").classList.add("bxs-moon");
    d.querySelector("html").style.backgroundColor = "rgb(32, 32, 36)";
    d.querySelector("body").style.backgroundColor = "rgb(32, 32, 36)";
    d.querySelector("body").style.color = "white";
    d.querySelector("header").style.backgroundColor = "rgb(26, 1, 42)";
    d.querySelector(".nota-content").style.backgroundColor = "#333";
    d.querySelector(".total-sub-content").style.backgroundColor =
      "rgb(49, 49, 53)";
    d.querySelectorAll(".folder").forEach((e) => {
      e.style.backgroundColor = "rgb(32, 32, 36)";
      e.style.border = "solid #e2e2e2";
    });

    d.querySelector(".folders").style.borderBottom = "solid #e2e2e2";

    d.querySelector("footer").style.backgroundColor = "rgb(29, 1, 48)";

    $popup_add_category.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_edit_category.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_add_product.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_edit_product.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_nota.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_lista.style.backgroundColor = "rgb(32, 32, 36)";
    popup.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_delete_folder.style.backgroundColor = "rgb(32, 32, 36)";
    $popup_add_folder.style.backgroundColor = "rgb(32, 32, 36)";
    ////CAMBIAR COLORES  DE LOS INPUTS///

    d.querySelectorAll("input").forEach((e) => {
      e.style.color = "white";
    });

    d.querySelectorAll("select").forEach((e) => {
      e.style.color = "white";
    });
    d.querySelectorAll("textarea").forEach((e) => {
      e.style.color = "white";
    });

    d.querySelectorAll("textarea").forEach((e) => {
      e.style.border = "2px solid white";
    });
    d.querySelectorAll("select").forEach((e) => {
      e.style.border = "2px solid white";
    });

    d.querySelectorAll("select").forEach((e) => {
      e.style.backgroundColor = "rgb(32, 32, 36)";
    });

    d.querySelectorAll("input").forEach((e) => {
      e.style.border = "2px solid white";
    });

    ////////CAMBIAR OPACIDAD DE ETIQUETAS////////
    d.querySelectorAll(".etiqueta-category").forEach((e) => {
      let new_color = e.style.backgroundColor;

      let rgb = new_color.toString();

      let valores = rgb
        .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
        .split(",");

      // Obtener los valores de rojo, verde y azul
      let rojo = parseInt(valores[0]);
      let verde = parseInt(valores[1]);
      let azul = parseInt(valores[2]);
      let opacidad = "0.5";

      // Construir el nuevo color RGBA
      let nuevoColor =
        "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

      ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia
      e.style.backgroundColor = nuevoColor;
    });

    ////////
    db.collection("Darkmode")
      .doc("mode")
      .set({
        blackmode: true,
      })
      .then(() => {
        console.log("Borrado exitosamente");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    confirm_mode = [false];
    $dark_mode_switch.classList.remove("active");
    $dark_mode_switch.querySelector(".bx").classList.add("bxs-sun");
    $dark_mode_switch.querySelector(".bx").classList.remove("bxs-moon");
    d.querySelector("html").style.backgroundColor = "#e2e2e2";
    d.querySelector("body").style.backgroundColor = "#e2e2e2";
    d.querySelector("body").style.color = "black";
    d.querySelector("header").style.backgroundColor = "gray";
    d.querySelector(".nota-content").style.backgroundColor = "white";
    d.querySelectorAll(".folder").forEach((e) => {
      e.style.backgroundColor = "#e2e2e2";
      e.style.border = "solid black";
    });

    d.querySelector(".folders").style.borderBottom = "solid black";

    d.querySelector(".total-sub-content").style.backgroundColor = "white";
    d.querySelector("footer").style.backgroundColor = "antiquewhite";

    $popup_add_category.style.backgroundColor = "#f8f8f8";
    $popup_edit_category.style.backgroundColor = "#f8f8f8";
    $popup_add_product.style.backgroundColor = "#f8f8f8";
    $popup_edit_product.style.backgroundColor = "#f8f8f8";
    $popup_nota.style.backgroundColor = "#f8f8f8";
    $popup_lista.style.backgroundColor = "#f8f8f8";
    popup.style.backgroundColor = "#f8f8f8";
    $popup_delete_folder.style.backgroundColor = "#f8f8f8";
    $popup_add_folder.style.backgroundColor = "#f8f8f8";

    ////////REGRESAR OPACIDAD DE ETIQUETAS////////
    d.querySelectorAll(".etiqueta-category").forEach((e) => {
      let new_color = e.style.backgroundColor;

      let rgb = new_color.toString();

      let valores = rgb
        .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
        .split(",");

      // Obtener los valores de rojo, verde y azul
      let rojo = parseInt(valores[0]);
      let verde = parseInt(valores[1]);
      let azul = parseInt(valores[2]);
      let opacidad = parseInt(valores[2]) + 0.5;

      // Construir el nuevo color RGBA
      let nuevoColor =
        "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

      ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia
      e.style.backgroundColor = nuevoColor;
    });

    ////////

    d.querySelectorAll("input").forEach((e) => {
      e.style.color = "black";
    });

    d.querySelectorAll("select").forEach((e) => {
      e.style.color = "black";
    });
    d.querySelectorAll("textarea").forEach((e) => {
      e.style.color = "black";
    });

    d.querySelectorAll("textarea").forEach((e) => {
      e.style.border = "2px solid #333";
    });
    d.querySelectorAll("select").forEach((e) => {
      e.style.border = "2px solid #333";
    });

    d.querySelectorAll("select").forEach((e) => {
      e.style.backgroundColor = "transparent";
    });

    d.querySelectorAll("input").forEach((e) => {
      e.style.border = "2px solid #333";
    });

    db.collection("Darkmode")
      .doc("mode")
      .set({
        blackmode: false,
      })
      .then(() => {
        console.log("Borrado exitosamente");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
});

let getAllCategories = (data, color, productos) => {
  if (data.length === 0) {
    $empty_category.style.display = "block";
  } else {
    let contColor = 0;
    let contProductos = 0;
    let sub_total = 0;

    data.forEach((el) => {
      ///para la insercion de la categoria
      $template.querySelector(".etiqueta-nombre").textContent = el;
      $template.querySelector(".etiqueta-category").style.backgroundColor =
        color[contColor];
      $template.querySelector(".referencia").textContent = selectfolder;
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
      $fragment
        .querySelector(".toolbar-left")
        .appendChild(desplegar(addProduct()));
      $fragment.querySelector(".toolbar-left").appendChild(marcar());
      $fragment.querySelector(".toolbar-left").appendChild(sortAlpha());
      $fragment.querySelector(".edit-category").appendChild(editarCategory());
      $fragment.querySelector(".toolbar-right").appendChild(addProduct());
      $fragment.querySelector(".toolbar-right").appendChild(deleteCategory());
      $subcontent.appendChild($fragment);
      contColor++;

      ///para la insercion de los productos

      let contador_de_productos = 0;
      for (let producto in productos[contProductos]) {
        contador_de_productos++;
      }

      for (let i = 0; i < contador_de_productos; i++) {
        let $template_indice_product =
            d.querySelector(".product-template").content,
          $template_registro_product =
            d.querySelector(".registro-product").content,
          $fragment_product = d.createDocumentFragment(),
          $fragment_registro = d.createDocumentFragment();

        let ELEMENT = $subcontent.querySelectorAll(".category-content");
        ELEMENT =
          ELEMENT[ELEMENT.length - 1].querySelector(".etiqueta-category");

        let $clone2 = d.importNode($template_indice_product, true);
        $fragment_product.appendChild($clone2);
        if (
          !ELEMENT.parentNode
            .querySelector(".contenedor-tabla")
            .classList.contains("indice")
        ) {
          ELEMENT.parentNode
            .querySelector(".contenedor-tabla")
            .appendChild($fragment_product);
          ELEMENT.parentNode
            .querySelector(".contenedor-tabla")
            .classList.add("indice");
        }

        let new_color = ELEMENT.style.backgroundColor;

        let rgb = new_color.toString();

        let valores = rgb
          .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
          .split(",");

        // Obtener los valores de rojo, verde y azul
        let rojo = parseInt(valores[0]);
        let verde = parseInt(valores[1]);
        let azul = parseInt(valores[2]);
        let opacidad = "0.3";

        // Construir el nuevo color RGBA
        let nuevoColor =
          "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

        ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia
        ELEMENT.parentNode.querySelector(
          ".product-list-content"
        ).style.backgroundColor = nuevoColor;

        let $clone3 = d.importNode($template_registro_product, true);
        $fragment_registro.appendChild($clone3);

        $fragment_registro.querySelector(".nota-product").appendChild(nota());
        $fragment_registro
          .querySelector(".tool-product")
          .appendChild(deleteProduct());
        $fragment_registro
          .querySelector(".tool-product")
          .appendChild(EditProduct());
        ELEMENT.parentNode
          .querySelector(".product-list-content")
          .appendChild($fragment_registro);

        //A contendi de texto los elementos del DOM de la tabla de prodcutos
        // se les asigan los valores de los inputs de "Agregar producto"

        let registro = ELEMENT.parentNode.querySelector(".product-list-content")
          .lastChild.previousElementSibling;
        registro.querySelector(
          ".referencia_producto"
        ).textContent = `Producto ${i + 1}`;
        registro.querySelector(".nom-product").textContent =
          productos[contProductos][`Producto ${i + 1}`]["nombre"];
        registro.querySelector(".cant-product").textContent =
          productos[contProductos][`Producto ${i + 1}`]["cantidad"];
        registro.querySelector(".space-cuant").textContent =
          productos[contProductos][`Producto ${i + 1}`]["cuantificador"];
        registro.querySelector(".precio-product").textContent =
          productos[contProductos][`Producto ${i + 1}`]["Precio"];
        registro.querySelector("a").textContent =
          productos[contProductos][`Producto ${i + 1}`]["enlace"];
        registro.querySelector("a").href =
          productos[contProductos][`Producto ${i + 1}`]["enlace"];
        registro.querySelector(".nota-product-aux").textContent =
          productos[contProductos][`Producto ${i + 1}`]["nota"];

        if (!registro.querySelector(".nota-product-aux").textContent == "") {
          registro.querySelector(".bx-notepad").classList.add("bxs-notepad");
          registro.querySelector(".bx-notepad").classList.remove("bx-notepad");
        }

        if (
          ELEMENT.parentNode
            .querySelector(".contenedor-tabla")
            .classList.contains("close")
        ) {
          ELEMENT.parentNode
            .querySelector(".contenedor-tabla")
            .classList.remove("close");
        }

        ELEMENT.parentNode
          .querySelector(".contenedor-tabla")
          .classList.add("active");

        ELEMENT.parentNode.querySelector(
          ".etiqueta-category"
        ).style.borderBottomLeftRadius = "0px";
        ELEMENT.parentNode.querySelector(
          ".etiqueta-category"
        ).style.borderBottomRightRadius = "0px";

        ELEMENT.parentNode
          .querySelector(".desplegar")
          .classList.remove("bx-chevron-right");

        ELEMENT.parentNode
          .querySelector(".desplegar")
          .classList.add("bx-chevron-down");

        //Sumar el precio del producto al subtotal//

        let elementosProduct = ELEMENT.parentNode
          .querySelector(".product-list-content")
          .querySelectorAll(".precio-product");
        let MultiplicadorProduct = ELEMENT.parentNode
          .querySelector(".product-list-content")
          .querySelectorAll(".cant-product");

        let arreglo_precio = [],
          arreglo_cantidad = [],
          arreglo_sumatoria = [];

        elementosProduct.forEach((el) => {
          arreglo_precio.push(parseFloat(el.textContent));
        });

        MultiplicadorProduct.forEach((el) => {
          arreglo_cantidad.push(parseFloat(el.textContent));
        });

        let posicion_arreglo = 0;
        arreglo_precio.forEach((el) => {
          arreglo_sumatoria.push(el * arreglo_cantidad[posicion_arreglo]);
          posicion_arreglo++;
        });

        sub_total = arreglo_sumatoria.reduce(function (acumulador, numero) {
          return acumulador + numero;
        }, 0);

        ELEMENT.parentNode
          .querySelector(".product-list-content")
          .querySelector(".sub-total").textContent = sub_total.toFixed(2);

        ///////
        //////---->>>>>>>>>>>>>>>>>>>>
      }

      contProductos++;
    });

    $empty_category.style.display = "none";
  }

  let subtotales = d.querySelectorAll(".sub-total");

  let TOTAL = 0.0;

  subtotales.forEach((e) => {
    TOTAL = parseFloat(e.textContent) + TOTAL;
  });

  $Total.textContent = TOTAL.toString();

  if (TOTAL == 0) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 🤐";
  }
  if (TOTAL > 0 && TOTAL < 100) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 😅";
  }

  if (TOTAL >= 100 && TOTAL < 1000) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 😊";
  }

  if (TOTAL >= 1000 && TOTAL < 10000) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 🤑";
  }

  if (TOTAL >= 10000) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 🧐🍷";
  }
};

$empty_category.style.display = "none";

function esperarBoton_deleteCategory() {
  return new Promise((resolve, reject) => {
    $confirm_delete.addEventListener("click", () => {
      resolve(true);
    });

    $cancel.addEventListener("click", function (e) {
      reject(true);
      e.preventDefault();

      overlay.classList.remove("active");
      popup.classList.remove("active");
    });
  });
}

function esperarBoton_deleteProduct() {
  return new Promise((resolve, reject) => {
    $confirm_delete.addEventListener("click", () => {
      resolve(true);
    });

    $cancel.addEventListener("click", function (e) {
      reject(true);
      e.preventDefault();

      overlay.classList.remove("active");
      popup.classList.remove("active");
    });
  });
}

$addcategory.addEventListener("click", () => {
  $overlay_add_category.classList.add("active");
  $popup_add_category.classList.add("active");
});

$addcategory.addEventListener("click", () => {
  $overlay_add_category.classList.add("active");
  $popup_add_category.classList.add("active");
});

$confirm_add_category.addEventListener("click", () => {
  if (!$input_new_category.value == "") {
    d.querySelector(".adver-categoria").style.display = "none";
    ///Desactivas el popup de "Agregar categoria"///
    $overlay_add_category.classList.remove("active");
    $popup_add_category.classList.remove("active");

    ///Al template de (del modelo de la categoria) le insertas el nombre y el color
    $template.querySelector(".etiqueta-nombre").textContent =
      $input_new_category.value;
    $template.querySelector(".referencia").textContent = selectfolder;

    let colorFondo = generarColorPastelAleatorio();
    if ($dark_mode_switch.classList.contains("active")) {
      let new_color = colorFondo;

      let rgb = new_color.toString();

      let valores = rgb
        .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
        .split(",");

      // Obtener los valores de rojo, verde y azul
      let rojo = parseInt(valores[0]);
      let verde = parseInt(valores[1]);
      let azul = parseInt(valores[2]);
      let opacidad = parseInt(valores[3]) - 0.5;

      // Construir el nuevo color RGBA
      let nuevoColor =
        "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

      ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia

      $template.querySelector(".etiqueta-category").style.backgroundColor =
        nuevoColor;
    } else {
      $template.querySelector(".etiqueta-category").style.backgroundColor =
        colorFondo;
    }

    ///Se declara el objeto donde se guardara los valores de nombre y color
    let Categoria = {};
    let entrada = $input_new_category.value;

    Categoria.nombre = entrada;
    Categoria.color = colorFondo;

    console.log(Categoria);

    ///AGREGAR A LA BASE DE DATO///

    db.collection(`${selectfolder}`)
      .doc(entrada)
      .set({
        Categoria, ///Y el objeto que se creo se le asigna el registro categoria en la base de datos
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    //
    Toastify({
      text: `La categoría ${entrada} fue añadida`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    //se limpia el input para que la proxima vez que se abra aparezca vacio//
    $input_new_category.value = "";
    $empty_category.style.display = "none"; //Se oculta el "NO hay despensa :,("
    //

    let $clone = d.importNode($template, true);

    $fragment.appendChild($clone);
    $fragment.querySelector(".toolbar-left").appendChild(desplegar());
    $fragment.querySelector(".toolbar-left").appendChild(marcar());
    $fragment.querySelector(".toolbar-left").appendChild(sortAlpha());
    $fragment.querySelector(".edit-category").appendChild(editarCategory());
    $fragment
      .querySelector(".toolbar-right")
      .appendChild(addProduct(desplegar()));
    $fragment.querySelector(".toolbar-right").appendChild(deleteCategory());

    $subcontent.appendChild($fragment);

    window.scrollTo(0, document.documentElement.scrollHeight);
  } else {
    d.querySelector(".adver-categoria").style.display = "block";
  }
});

$close_window.addEventListener("click", () => {
  $overlay_add_category.classList.remove("active");
  $popup_add_category.classList.remove("active");
});

$close_window_product.addEventListener("click", () => {
  $overlay_add_product.classList.remove("active");
  $popup_add_product.classList.remove("active");
  $input_new_product_nombre.value = "";
  $input_new_product_cantidad.value = "";
  $input_new_product_precio.value = "";
  $input_new_product_enlace.value = "";
  $input_new_product_nota.value = "";
});

$close_window_product_edit.addEventListener("click", () => {
  $overlay_edit_product.classList.remove("active");
  $popup_edit_product.classList.remove("active");
});

$close_window_edit_category.addEventListener("click", () => {
  $overlay_edit_category.classList.remove("active");
  $popup_edit_category.classList.remove("active");
});

let ELEMENTEDIT, ENTRADA_ORIGINAL;

function editarCategory() {
  const editCategoryBtn = d.createElement("i");
  editCategoryBtn.classList.add("bx");
  editCategoryBtn.classList.add("bx-edit");
  editCategoryBtn.classList.add("bx-sm");

  editCategoryBtn.addEventListener("click", (e) => {
    $overlay_edit_category.classList.add("active");
    $popup_edit_category.classList.add("active");
    let item = e.target.parentElement;
    let elementoPadre = item.parentNode;
    ELEMENTEDIT = elementoPadre;
    console.log(elementoPadre);
    $input_new_edit_category.value =
      elementoPadre.querySelector(".etiqueta-nombre").textContent;
    ENTRADA_ORIGINAL =
      elementoPadre.querySelector(".etiqueta-nombre").textContent;
  });
  return editCategoryBtn;
}

//CONFIRMACION DE LA EDICION DE LA CATEGORIA//

$confirm_edit_category.addEventListener("click", () => {
  if (!$input_new_edit_category.value == "") {
    d.querySelector(".adver-edit-categoria").style.display = "none";
    ///Desactivas el popup de "Agregar categoria"///
    $overlay_edit_category.classList.remove("active");
    $popup_edit_category.classList.remove("active");

    ///Al template de (del modelo de la categoria) le insertas el nombre y el color
    ELEMENTEDIT.querySelector(".etiqueta-nombre").textContent =
      $input_new_edit_category.value;

    ///Se declara el objeto donde se guardara los valores de nombre y color

    let entrada = $input_new_edit_category.value;
    let Categoria = {};

    //lanza el Toasti
    Toastify({
      text: `La categoría ${entrada} fue editada`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(102, 69, 7)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    ///AGREGAR A LA BASE DE DATO///

    db.collection(`${selectfolder}`)
      .doc(ENTRADA_ORIGINAL)
      .get()
      .then((querySnapshot) => {
        /* Categoria.nombre = entrada;

        Categoria.color = querySnapshot.data()["Categoria"].color;
        */
        Categoria.nombre = entrada;
        Categoria.color = querySnapshot.data()["Categoria"].color;
        let contentProducts = querySnapshot.data()["Productos"];
        if (contentProducts != undefined) {
          db.collection(`${selectfolder}`)
            .doc(entrada)
            .set({
              Categoria,
              Productos: contentProducts, ///Y el objeto que se creo se le asigna el registro categoria en la base de datos
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        } else {
          db.collection(`${selectfolder}`)
            .doc(entrada)
            .set({
              Categoria,
              ///Y el objeto que se creo se le asigna el registro categoria en la base de datos
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }

        db.collection(`${selectfolder}`)
          .doc(ENTRADA_ORIGINAL)
          .delete()

          .then(() => {
            console.log("Borrado exitosamente");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });

    //se limpia el input para que la proxima vez que se abra aparezca vacio//
    $input_new_edit_category.value = "";
  } else {
    d.querySelector(".adver-edit-categoria").style.display = "block";
  }
});

function EditProduct() {
  const editBtn = d.createElement("i");
  editBtn.classList.add("bx");
  editBtn.classList.add("bxs-edit-alt");
  editBtn.classList.add("bx-md");

  editBtn.addEventListener("click", (e) => {
    $overlay_edit_product.classList.add("active");
    $popup_edit_product.classList.add("active");
    let item = e.target.parentElement;
    let elementoPadre = item.parentNode;

    ELEMENT = elementoPadre;

    ///Primero se pasan todos los valores de la tabla al input
    $input_new_product_nombre_edit.value =
      ELEMENT.querySelector(".nom-product").textContent;
    $select_cantidad_edit.value =
      ELEMENT.querySelector(".space-cuant").textContent;
    $input_new_product_cantidad_edit.value =
      ELEMENT.querySelector(".cant-product").textContent;
    $input_new_product_precio_edit.value =
      ELEMENT.querySelector(".precio-product").textContent;
    $input_new_product_enlace_edit.value =
      ELEMENT.querySelector("a").textContent;
    if ($input_new_product_enlace_edit.value == "") {
      ELEMENT.querySelector("a").href = " ";
    } else {
      $input_new_product_enlace_edit.value = ELEMENT.querySelector("a").href;
    }

    $input_new_product_nota_edit.value =
      ELEMENT.querySelector(".nota-product-aux").textContent;
  });

  return editBtn;
}

//CONFIRMACION DE LA EDICION DEL PRODUCTO
$confirm_edit_product.addEventListener("click", () => {
  let verificador_nombre = [];
  ELEMENT.parentNode.querySelectorAll(".product-reg-content").forEach((e) => {
    verificador_nombre.push(e.querySelector(".nom-product").textContent);
  });
  if (
    !$input_new_product_nombre_edit.value == "" /* &&
    !$input_new_product_cantidad.value == "" &&
    !$input_new_product_precio.value == ""*/
  ) {
    /*if (verificador_nombre.includes($input_new_product_nombre_edit.value)) {
      d.querySelector(".adver-ver-nombre-edit").style.display = "block";
      return;
    }*/

    if ($input_new_product_cantidad_edit.value == "") {
      $input_new_product_cantidad_edit.value = 0;
    }

    if ($input_new_product_precio_edit.value == "") {
      $input_new_product_precio_edit.value = 0;
    }
    //console.log(totalRef);
    d.querySelector(".adver-nombre-edit").style.display = "none";
    d.querySelector(".adver-cantidad-edit").style.display = "none";
    d.querySelector(".adver-precio-edit").style.display = "none";
    //Se desactiva el popup de "agregar prodcuto"
    $overlay_edit_product.classList.remove("active");
    $popup_edit_product.classList.remove("active");

    ///PUEDE QUE NO SE NECESITE///
    // Se declaran templates del DOm necesarios para construir la tabla de prodcutos///
    let $template_indice_product = d.querySelector(".product-template").content,
      $fragment_product = d.createDocumentFragment();

    let $clone2 = d.importNode($template_indice_product, true);
    $fragment_product.appendChild($clone2);
    if (!ELEMENT.parentNode.parentNode.classList.contains("indice")) {
      ELEMENT.parentNode.parentNode.appendChild($fragment_product);
      ELEMENT.parentNode.classList.add("indice");
    }

    let new_color = ELEMENT.parentNode.parentNode.style.backgroundColor;

    let rgb = new_color.toString();

    let valores = rgb
      .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
      .split(",");

    // Obtener los valores de rojo, verde y azul
    let rojo = parseInt(valores[0]);
    let verde = parseInt(valores[1]);
    let azul = parseInt(valores[2]);
    let opacidad = "0.3";

    // Construir el nuevo color RGBA
    let nuevoColor =
      "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

    ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia
    ELEMENT.parentNode.style.backgroundColor = nuevoColor;

    if ($input_new_product_enlace_edit.value == "") {
      ELEMENT.querySelector("a").textContent =
        $input_new_product_enlace_edit.value;
      ELEMENT.querySelector("a").href = $input_new_product_enlace_edit.value;
    } else if ($input_new_product_enlace_edit.value.includes("https://")) {
      ELEMENT.querySelector("a").textContent =
        $input_new_product_enlace_edit.value;
      ELEMENT.querySelector("a").href = $input_new_product_enlace_edit.value;
    } else {
      ELEMENT.querySelector("a").textContent =
        "https://" + $input_new_product_enlace_edit.value;
      ELEMENT.querySelector("a").href =
        "https://" + $input_new_product_enlace_edit.value;
    }
    Toastify({
      text: `El producto ${
        ELEMENT.querySelector(".nom-product").textContent
      } fue editado`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(102, 69, 7)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    ELEMENT.querySelector(".nom-product").textContent =
      $input_new_product_nombre_edit.value;
    ELEMENT.querySelector(".space-cuant").textContent =
      $select_cantidad_edit.value;
    ELEMENT.querySelector(".cant-product").textContent =
      $input_new_product_cantidad_edit.value;
    ELEMENT.querySelector(".precio-product").textContent =
      $input_new_product_precio_edit.value;
    /* ELEMENT.querySelector("a").textContent =
      $input_new_product_enlace_edit.value;
    ELEMENT.querySelector("a").href = $input_new_product_enlace_edit.value;*/
    ELEMENT.querySelector(".nota-product-aux").textContent =
      $input_new_product_nota_edit.value;

    //Si hay nota, se cambia el icono

    if (!ELEMENT.querySelector(".nota-product-aux").textContent == "") {
      ELEMENT.querySelector(".vacio").classList.add("bxs-notepad");
      ELEMENT.querySelector(".bxs-notepad").classList.remove("bx-notepad");
    } else {
      ELEMENT.querySelector(".vacio").classList.add("bx-notepad");
      ELEMENT.querySelector(".bx-notepad").classList.remove("bxs-notepad");
    }

    let elementosProduct =
      ELEMENT.parentNode.querySelectorAll(".precio-product");
    let MultiplicadorProduct =
      ELEMENT.parentNode.querySelectorAll(".cant-product");

    let arreglo_precio = [],
      arreglo_cantidad = [],
      arreglo_sumatoria = [];

    elementosProduct.forEach((el) => {
      arreglo_precio.push(parseFloat(el.textContent));
    });

    MultiplicadorProduct.forEach((el) => {
      arreglo_cantidad.push(parseFloat(el.textContent));
    });

    let posicion_arreglo = 0;
    arreglo_precio.forEach((el) => {
      arreglo_sumatoria.push(el * arreglo_cantidad[posicion_arreglo]);
      posicion_arreglo++;
    });

    var sub_total = arreglo_sumatoria.reduce(function (acumulador, numero) {
      return acumulador + numero;
    }, 0);

    ELEMENT.parentNode.querySelector(".sub-total").textContent = sub_total;
    ///////

    ///AGREGAR EL PRODCUTO A LA BASE DE DATOS///
    let referencia =
      ELEMENT.parentNode.parentNode.parentNode.querySelector(
        ".etiqueta-nombre"
      ).textContent;

    let No_product = ELEMENT.querySelector(".referencia_producto").textContent;

    let Productos = {},
      otroObjeto = {};
    otroObjeto.nombre = $input_new_product_nombre_edit.value;
    otroObjeto.cantidad = $input_new_product_cantidad_edit.value;
    otroObjeto.cuantificador = $select_cantidad_edit.value;
    otroObjeto.Precio = $input_new_product_precio_edit.value;
    otroObjeto.enlace = $input_new_product_enlace_edit.value;
    otroObjeto.nota = $input_new_product_nota_edit.value;
    Productos[`${No_product}`] = otroObjeto;

    db.collection(`${selectfolder}`)
      .doc(referencia)
      .set(
        {
          Productos,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    ///Se limpian los inputs///
    $input_new_product_nombre_edit.value = "";
    $input_new_product_cantidad_edit.value = "";
    $input_new_product_precio_edit.value = "";
    $input_new_product_enlace_edit.value = "";
    $input_new_product_nota_edit.value = "";
    $select_cantidad_edit.value = "Pza";

    ///
  } else {
    d.querySelector(".adver-nombre-edit").style.display = "none";

    //d.querySelector(".adver-cantidad").style.display = "none";
    //d.querySelector(".adver-precio").style.display = "none";

    if ($input_new_product_nombre_edit.value == "") {
      d.querySelector(".adver-nombre-edit").style.display = "block";
    }
    /*if ($input_new_product_cantidad.value == "") {
      d.querySelector(".adver-cantidad").style.display = "block";
    }
    if ($input_new_product_precio.value == "") {
      d.querySelector(".adver-precio").style.display = "block";
    }*/
  }
});

//

///FUNCION BORRAR PRODUCTO///
function deleteProduct() {
  const deleteProdBtn = d.createElement("i");

  deleteProdBtn.classList.add("bx");
  deleteProdBtn.classList.add("bxs-trash-alt");
  deleteProdBtn.classList.add("bx-md");

  deleteProdBtn.addEventListener("click", (e) => {
    overlay.classList.add("active");
    popup.classList.add("active");
    async function esperar() {
      await esperarBoton_deleteProduct();
      let item = e.target.parentElement;
      let elementoPadre = item.parentNode;

      let referencia =
        elementoPadre.parentNode.parentNode.parentNode.querySelector(
          ".etiqueta-nombre"
        ).textContent;

      let verificador = elementoPadre.parentNode.parentNode;

      ///BORRAR DE LA BASE DE DATO///

      let referencia_producto = elementoPadre.querySelector(
        ".referencia_producto"
      ).textContent;
      //Lanzamiento del toasti
      Toastify({
        text: `El producto ${
          elementoPadre.querySelector(".nom-product").textContent
        } fue eliminado`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "rgb(121, 8, 8)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      let campo_padre = "Productos";
      let actualizacion = {};
      actualizacion[`${campo_padre}.${referencia_producto}`] =
        firebase.firestore.FieldValue.delete();

      db.collection(`${selectfolder}`)
        .doc(referencia)
        .update(actualizacion)
        .then(() => {
          console.log("Borrado exitosamente");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      //

      //REDEFINE LA REFERENCIA DE LOS PRODCUTOS///

      db.collection(`${selectfolder}`)
        .doc(referencia)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Obtiene los datos del documento
            const datos = doc.data();
            let contador = 1;
            let Objetonew = {};

            let renuevo = {};
            for (let propiedad in doc.data().Productos) {
              console.log(propiedad);

              Objetonew = datos["Productos"][propiedad];
              console.log(Objetonew);
              (renuevo[`Producto ${contador}`] = Objetonew), contador++;
              console.log(renuevo);
            }

            const objetoPadre = {
              Productos: renuevo,
            };

            console.log(objetoPadre);

            // Combina los datos originales con el nuevo objeto
            const datosActualizados = Object.assign({}, datos, objetoPadre);

            // Escribe los datos actualizados en el documento
            return db

              .collection(`${selectfolder}`)
              .doc(referencia)
              .set(datosActualizados);
            /*} else {
              throw new Error("El campo original no existe en el documento.");
            }*/
          } else {
            throw new Error("El documento no existe.");
          }
        })
        .then(() => {
          console.log("Nombre del campo cambiado exitosamente");
        })
        .catch((error) => {
          console.error("Error al cambiar el nombre del campo:", error);
        });
      ///

      elementoPadre.remove();

      if (verificador.querySelectorAll(".product-reg-content").length == 0) {
        verificador.classList.remove("indice");
        verificador.classList.remove("active");
        verificador.classList.add("close");
        verificador.querySelector(".product-list-content").remove();
        console.log(verificador);
        setTimeout(() => {
          verificador.parentNode.querySelector(
            ".etiqueta-category"
          ).style.borderBottomLeftRadius = "20px";
          verificador.parentNode.querySelector(
            ".etiqueta-category"
          ).style.borderBottomRightRadius = "20px";
        }, 100);
      }

      overlay.classList.remove("active");
      popup.classList.remove("active");
      if (document.querySelectorAll(".category-content").length === 0) {
        $empty_category.style.display = "block";
      }
    }

    esperar();
  });

  return deleteProdBtn;
}
///

///FUNCION BORRAR CATEGORIA////
function deleteCategory() {
  const deleteBtn = d.createElement("i");

  deleteBtn.classList.add("bx");
  deleteBtn.classList.add("bxs-trash");
  deleteBtn.classList.add("bx-md");
  deleteBtn.classList.add("bx-tada-hover");
  deleteBtn.classList.add("delete");

  deleteBtn.addEventListener("click", (e) => {
    overlay.classList.add("active");
    popup.classList.add("active");
    async function esperar() {
      await esperarBoton_deleteCategory();
      let item = e.target.parentElement;
      let elementoPadre = item.parentNode;

      let referencia =
        elementoPadre.parentNode.querySelector(".etiqueta-nombre").textContent;
      Toastify({
        text: `La categoría ${referencia} fue eliminada`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "rgb(121, 8, 8)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      ///BORRAR DE LA BASE DE DATO///

      db.collection(`${selectfolder}`)
        .doc(referencia)
        .delete()

        .then(() => {
          console.log("Borrado exitosamente");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      //

      elementoPadre.parentNode.remove();

      overlay.classList.remove("active");
      popup.classList.remove("active");
      if (document.querySelectorAll(".category-content").length === 0) {
        $empty_category.style.display = "block";
      }
    }
    esperar();
  });

  return deleteBtn;
}

///FUNCION AGREGAR PRODUCTO A UNA CATEGORIA///
let ELEMENT;
function addProduct() {
  let d = document,
    addProductBtn = d.createElement("i");

  addProductBtn.classList.add("bx");
  addProductBtn.classList.add("bx-plus");
  addProductBtn.classList.add("bx-md");
  addProductBtn.classList.add("bx-tada-hover");
  addProductBtn.classList.add("add-product");

  addProductBtn.addEventListener("click", (e) => {
    $overlay_add_product.classList.add("active");
    $popup_add_product.classList.add("active");
    d.querySelector(".adver-ver-nombre").style.display = "none";
    let item = e.target.parentElement;
    let elementoPadre = item.parentNode;

    ELEMENT = elementoPadre;
  });

  return addProductBtn;
}

$confirm_add_product.addEventListener("click", () => {
  let verificador_nombre = [];
  ELEMENT.parentNode.querySelectorAll(".product-reg-content").forEach((e) => {
    verificador_nombre.push(e.querySelector(".nom-product").textContent);
  });
  if (
    !$input_new_product_nombre.value == "" /* &&
    !$input_new_product_cantidad.value == "" &&
    !$input_new_product_precio.value == ""*/
  ) {
    if (verificador_nombre.includes($input_new_product_nombre.value)) {
      d.querySelector(".adver-ver-nombre").style.display = "block";
      return;
    }

    if ($input_new_product_cantidad.value == "") {
      $input_new_product_cantidad.value = 0;
    }

    if ($input_new_product_precio.value == "") {
      $input_new_product_precio.value = 0;
    }
    //console.log(totalRef);
    d.querySelector(".adver-nombre").style.display = "none";
    d.querySelector(".adver-cantidad").style.display = "none";
    d.querySelector(".adver-precio").style.display = "none";
    //Se desactiva el popup de "agregar prodcuto"
    $overlay_add_product.classList.remove("active");
    $popup_add_product.classList.remove("active");

    // Se declaran templates del DOm necesarios para construir la tabla de prodcutos///
    let $template_indice_product = d.querySelector(".product-template").content,
      $template_registro_product = d.querySelector(".registro-product").content,
      $fragment_product = d.createDocumentFragment(),
      $fragment_registro = d.createDocumentFragment();

    let $clone2 = d.importNode($template_indice_product, true);
    $fragment_product.appendChild($clone2);
    if (
      !ELEMENT.parentNode
        .querySelector(".contenedor-tabla")
        .classList.contains("indice")
    ) {
      ELEMENT.parentNode
        .querySelector(".contenedor-tabla")
        .appendChild($fragment_product);
      ELEMENT.parentNode
        .querySelector(".contenedor-tabla")
        .classList.add("indice");
    }

    let new_color = ELEMENT.style.backgroundColor;

    let rgb = new_color.toString();

    let valores = rgb
      .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
      .split(",");

    // Obtener los valores de rojo, verde y azul
    let rojo = parseInt(valores[0]);
    let verde = parseInt(valores[1]);
    let azul = parseInt(valores[2]);
    let opacidad = "0.3";

    // Construir el nuevo color RGBA
    let nuevoColor =
      "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";

    ///Se le asigna el color de la categoria el contenedor de la tabla pero con transparencia
    ELEMENT.parentNode.querySelector(
      ".product-list-content"
    ).style.backgroundColor = nuevoColor;

    let $clone3 = d.importNode($template_registro_product, true);
    $fragment_registro.appendChild($clone3);

    $fragment_registro.querySelector(".nota-product").appendChild(nota());
    $fragment_registro
      .querySelector(".tool-product")
      .appendChild(deleteProduct());
    $fragment_registro
      .querySelector(".tool-product")
      .appendChild(EditProduct());
    ELEMENT.parentNode
      .querySelector(".product-list-content")
      .appendChild($fragment_registro);

    //A contendi de texto los elementos del DOM de la tabla de prodcutos
    // se les asigan los valores de los inputs de "Agregar producto"

    let registro = ELEMENT.parentNode.querySelector(".product-list-content")
      .lastChild.previousElementSibling;
    ///confirmar que el anlace tiene https://

    if ($input_new_product_enlace.value == "") {
      registro.querySelector("a").textContent = $input_new_product_enlace.value;
      registro.querySelector("a").href = $input_new_product_enlace.value;
    } else if ($input_new_product_enlace.value.includes("https://")) {
      registro.querySelector("a").textContent = $input_new_product_enlace.value;
      registro.querySelector("a").href = $input_new_product_enlace.value;
    } else {
      registro.querySelector("a").textContent =
        "https://" + $input_new_product_enlace.value;
      registro.querySelector("a").href =
        "https://" + $input_new_product_enlace.value;
    }

    Toastify({
      text: `El producto ${$input_new_product_nombre.value} fue añadido`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(18, 73, 5)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    registro.querySelector(".nom-product").textContent =
      $input_new_product_nombre.value;
    registro.querySelector(".space-cuant").textContent = $select_cantidad.value;
    registro.querySelector(".cant-product").textContent =
      $input_new_product_cantidad.value;
    registro.querySelector(".precio-product").textContent = parseFloat(
      $input_new_product_precio.value
    ).toFixed(2);

    registro.querySelector(".nota-product-aux").textContent =
      $input_new_product_nota.value;

    //Si hay nota, se cambia el icono

    if (!registro.querySelector(".nota-product-aux").textContent == "") {
      registro.querySelector(".bx-notepad").classList.add("bxs-notepad");
      registro.querySelector(".bx-notepad").classList.remove("bx-notepad");
    }

    if (
      ELEMENT.parentNode
        .querySelector(".contenedor-tabla")
        .classList.contains("close")
    ) {
      ELEMENT.parentNode
        .querySelector(".contenedor-tabla")
        .classList.remove("close");
    }

    ELEMENT.parentNode
      .querySelector(".contenedor-tabla")
      .classList.add("active");

    ELEMENT.parentNode.querySelector(
      ".etiqueta-category"
    ).style.borderBottomLeftRadius = "0px";
    ELEMENT.parentNode.querySelector(
      ".etiqueta-category"
    ).style.borderBottomRightRadius = "0px";

    ELEMENT.parentNode
      .querySelector(".desplegar")
      .classList.remove("bx-chevron-right");

    ELEMENT.parentNode
      .querySelector(".desplegar")
      .classList.add("bx-chevron-down");

    //Sumar el precio del producto al subtotal//

    let elementosProduct = ELEMENT.parentNode
      .querySelector(".product-list-content")
      .querySelectorAll(".precio-product");
    let MultiplicadorProduct = ELEMENT.parentNode
      .querySelector(".product-list-content")
      .querySelectorAll(".cant-product");

    let arreglo_precio = [],
      arreglo_cantidad = [],
      arreglo_sumatoria = [];

    elementosProduct.forEach((el) => {
      arreglo_precio.push(parseFloat(el.textContent));
    });

    MultiplicadorProduct.forEach((el) => {
      arreglo_cantidad.push(parseFloat(el.textContent));
    });

    let posicion_arreglo = 0;
    arreglo_precio.forEach((el) => {
      arreglo_sumatoria.push(el * arreglo_cantidad[posicion_arreglo]);
      posicion_arreglo++;
    });

    var sub_total = arreglo_sumatoria.reduce(function (acumulador, numero) {
      return acumulador + numero;
    }, 0);
    console.log(sub_total);
    ELEMENT.parentNode
      .querySelector(".product-list-content")
      .querySelector(".sub-total").textContent = sub_total.toFixed(2);
    ///////

    ///AGREGAR EL PRODCUTO A LA BASE DE DATOS///
    let referencia =
      ELEMENT.parentNode.querySelector(".etiqueta-nombre").textContent;

    let No_product = ELEMENT.parentNode
      .querySelector(".contenedor-tabla")
      .querySelectorAll(".product-reg-content").length;

    registro.querySelector(
      ".referencia_producto"
    ).textContent = `Producto ${No_product}`;

    let Productos = {},
      otroObjeto = {};
    otroObjeto.nombre = $input_new_product_nombre.value;
    otroObjeto.cantidad = $input_new_product_cantidad.value;
    otroObjeto.cuantificador = $select_cantidad.value;
    otroObjeto.Precio = parseFloat($input_new_product_precio.value).toFixed(2);
    otroObjeto.enlace = $input_new_product_enlace.value;
    otroObjeto.nota = $input_new_product_nota.value;
    Productos[`Producto ${No_product}`] = otroObjeto;

    db.collection(`${selectfolder}`)
      .doc(referencia)
      .set(
        {
          Productos,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    ///Se limpian los inputs///
    $input_new_product_nombre.value = "";
    $input_new_product_cantidad.value = "";
    $input_new_product_precio.value = "";
    $input_new_product_enlace.value = "";
    $input_new_product_nota.value = "";
    $select_cantidad.value = "Pza";

    ///
  } else {
    d.querySelector(".adver-nombre").style.display = "none";

    //d.querySelector(".adver-cantidad").style.display = "none";
    //d.querySelector(".adver-precio").style.display = "none";

    if ($input_new_product_nombre.value == "") {
      d.querySelector(".adver-nombre").style.display = "block";
    }
    /*if ($input_new_product_cantidad.value == "") {
      d.querySelector(".adver-cantidad").style.display = "block";
    }
    if ($input_new_product_precio.value == "") {
      d.querySelector(".adver-precio").style.display = "block";
    }*/
  }
});

function generarColorPastelAleatorio() {
  const coloresPastel = [
    "rgba(255, 182, 193,1)",
    "rgba(135, 206, 250,1)",
    "rgba(255, 255, 224,1)",
    "rgba(152, 255, 152,1)",
    "rgba(229, 182, 255,1)",
    "rgba(255, 218, 185,1)",
    "rgba(175, 238, 238,1)",
    "rgba(230, 230, 250,1)",
    "rgba(173, 216, 230,1)",
    "rgba(255, 250, 205,1)",
    "rgba(173, 216, 230,1)",
    "rgba(255, 127, 80,1)",
    "rgba(255, 228, 196,1)",
    "rgba(192, 192, 192,1)",
    "rgba(216, 191, 216,1)",
    "rgba(255, 253, 208,1)",
    "rgba(127, 255, 212,1)",
    "rgba(250, 128, 114,1)",
    "rgba(144, 160, 173,1)",
    "rgba(255, 244, 174,1)",
  ];
  const indiceAleatorio = Math.floor(Math.random() * coloresPastel.length);
  return coloresPastel[indiceAleatorio];
}

function desplegar() {
  const desplegarBtn = d.createElement("i");
  desplegarBtn.classList.add("bx");
  desplegarBtn.classList.add("bx-chevron-right");
  desplegarBtn.classList.add("bx-md");
  desplegarBtn.classList.add("desplegar");

  desplegarBtn.addEventListener("click", () => {
    let elementoPadre = desplegarBtn.parentNode.parentNode.parentNode;
    if (
      elementoPadre
        .querySelector(".contenedor-tabla")
        .classList.contains("indice")
    ) {
      if (desplegarBtn.classList.contains("bx-chevron-down")) {
        elementoPadre
          .querySelector(".contenedor-tabla")
          .classList.remove("active");
        elementoPadre.querySelector(".contenedor-tabla").classList.add("close");
        desplegarBtn.classList.remove("bx-chevron-down");
        desplegarBtn.classList.add("bx-chevron-right");
        setTimeout(() => {
          desplegarBtn.parentNode.parentNode.style.borderBottomLeftRadius =
            "20px";
          desplegarBtn.parentNode.parentNode.style.borderBottomRightRadius =
            "20px";
        }, 200);
      } else {
        desplegarBtn.classList.remove("bx-chevron-right");
        desplegarBtn.classList.add("bx-chevron-down");
        elementoPadre
          .querySelector(".contenedor-tabla")
          .classList.add("active");
        elementoPadre
          .querySelector(".contenedor-tabla")
          .classList.remove("close");

        desplegarBtn.parentNode.parentNode.style.borderBottomLeftRadius = "0px";
        desplegarBtn.parentNode.parentNode.style.borderBottomRightRadius =
          "0px";
      }
    }
  });

  return desplegarBtn;
}

function marcar() {
  const marcarBtn = d.createElement("i");
  marcarBtn.classList.add("bx");
  marcarBtn.classList.add("bx-square");
  marcarBtn.classList.add("bx-md");
  marcarBtn.classList.add("marcar");

  marcarBtn.addEventListener("click", () => {
    if (marcarBtn.classList.contains("bx-square")) {
      marcarBtn.classList.remove("bx-square");
      marcarBtn.classList.add("bx-check-square");
    } else {
      marcarBtn.classList.add("bx-square");
      marcarBtn.classList.remove("bx-check-square");
    }
  });

  return marcarBtn;
}

function sortAlpha() {
  const ordenarBtn = d.createElement("i");
  ordenarBtn.classList.add("bx");
  ordenarBtn.classList.add("bx-sort-a-z");
  ordenarBtn.classList.add("bx-md");
  ordenarBtn.classList.add("ordenar");

  ordenarBtn.addEventListener("click", (e) => {
    let listaComparacion = [];

    e.target.parentNode.parentNode.parentNode
      .querySelectorAll(".product-reg-content")
      .forEach((e) => {
        listaComparacion.push(e.querySelector(".nom-product").textContent);
      });

    e.target.parentNode.parentNode.parentNode
      .querySelectorAll(".product-reg-content")
      .forEach((e) => {
        let indice = listaComparacion
          .sort()
          .indexOf(`${e.querySelector(".nom-product").textContent}`);
        e.style.order = `${indice}`;
      });
  });

  return ordenarBtn;
}

let CONTEXTO;
function nota() {
  const notaBtn = d.createElement("i");
  notaBtn.classList.add("bx");
  notaBtn.classList.add("bx-notepad");
  notaBtn.classList.add("bx-md");
  notaBtn.classList.add("vacio");

  const parrafo = d.createElement("p");
  parrafo.classList.add("nota-product-aux");
  parrafo.style.display = "none";

  notaBtn.appendChild(parrafo);

  notaBtn.addEventListener("click", (e) => {
    $overlay_nota.classList.add("active");
    $popup_nota.classList.add("active");

    let item = e.target.querySelector("p").textContent;
    $overlay_nota.querySelector(".nota-content").value = item;

    if (item == "") {
      $overlay_nota.querySelector(".nota-content").value = "";

      e.target.querySelector("p").parentNode.classList.add("bx-notepad");
    } else {
      e.target.querySelector("p").parentNode.classList.remove("bx-notepad");
      e.target.querySelector("p").parentNode.classList.add("bxs-notepad");
    }
    CONTEXTO = e.target;
  });

  return notaBtn;
}

$close_window_nota.addEventListener("click", (e) => {
  $overlay_nota.classList.remove("active");
  $popup_nota.classList.remove("active");

  console.log(CONTEXTO);

  let referencia =
    CONTEXTO.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(
      ".etiqueta-nombre"
    ).textContent;

  let No_product = CONTEXTO.parentNode.parentNode.querySelector(
    ".referencia_producto"
  ).textContent;

  let Productos = {},
    otroObjeto = {};

  otroObjeto.nota = $overlay_nota.querySelector(".nota-content").value;
  CONTEXTO.querySelector("p").textContent =
    $overlay_nota.querySelector(".nota-content").value;
  Productos[`${No_product}`] = otroObjeto;

  console.log(Productos);

  db.collection(`${selectfolder}`)
    .doc(referencia)
    .set(
      {
        Productos,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  if ($overlay_nota.querySelector(".nota-content").value == "") {
    CONTEXTO.querySelector("p").parentNode.classList.add("bx-notepad");
  } else {
    CONTEXTO.querySelector("p").parentNode.classList.remove("bx-notepad");
    CONTEXTO.querySelector("p").parentNode.classList.add("bxs-notepad");
  }
  $overlay_nota.querySelector(".nota-content").value == "";
});

d.addEventListener("click", () => {
  let subtotales = d.querySelectorAll(".sub-total");
  let TOTAL = 0.0;
  subtotales.forEach((e) => {
    TOTAL = parseFloat(e.textContent) + TOTAL;
  });

  if (TOTAL == 0) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 🤐";
  }
  if (TOTAL > 0 && TOTAL < 100) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 😅";
  }

  if (TOTAL >= 100 && TOTAL < 1000) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 😊";
  }

  if (TOTAL >= 1000 && TOTAL < 10000) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 🤑";
  }

  if (TOTAL >= 10000) {
    $Total.textContent =
      "Total: " +
      TOTAL.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      }) +
      " 🧐🍷";
  }
});
let inventario = [],
  recordar = [];
$modo_lista.addEventListener("click", () => {
  d.querySelectorAll(".product-reg-content").forEach((e) => {
    inventario.push(e.querySelector(".nom-product").textContent);
  });

  $overlay_lista.classList.add("active");
  $popup_lista.classList.add("active");
  if (d.querySelectorAll(".product-list-content").length == 0) {
    ///IDENTIFICADOR DE POSICIONES DE LA LISTA ///

    ///
    $overlay_lista.querySelector(".lista-content-lista").textContent =
      "No hay productos";
  } else {
    inventario.forEach((e) => {
      if (recordar.includes(e)) {
        // console.log("Esta tachado:", e);
      }
    });
    inventario = [];
    $overlay_lista.querySelector(".lista-content-lista").textContent = "";
    d.querySelectorAll(".category-content").forEach((e) => {
      let nombre_categoria = e.querySelector(".etiqueta-nombre").textContent;

      let $template_categoria_list = d.querySelector(
        ".categoria-list-content"
      ).content;
      let clone_categoria = d.importNode($template_categoria_list, true);
      clone_categoria.querySelector(".categoria-list").textContent =
        nombre_categoria + ":";
      $overlay_lista
        .querySelector(".lista-content-lista")
        .appendChild(clone_categoria);
      e.querySelectorAll(".product-reg-content").forEach((el) => {
        let nombre_producto = el.querySelector(".nom-product").textContent;

        let cantidad_producto = el.querySelector(
          ".cuantificador-content"
        ).textContent;
        let precio_producto = el.querySelector(".precio-product").textContent;

        let $template_producto_list = d.querySelector(
          ".producto-list-content"
        ).content;
        let clone_producto = d.importNode($template_producto_list, true);
        clone_producto.querySelector(".nombre-producto-lista").textContent =
          nombre_producto;
        clone_producto.querySelector(".cantidad-producto-lista").textContent =
          cantidad_producto;
        clone_producto.querySelector(".precio-producto-lista").textContent =
          "$" + precio_producto;
        clone_producto.querySelector(".btn-tachar").appendChild(tachar());
        $overlay_lista
          .querySelector(".lista-content-lista")
          .appendChild(clone_producto);
      });
    });
    let $template_total = d.querySelector(".total-template").content;
    let clone_total = d.importNode($template_total, true);
    clone_total.querySelector(".total-list").textContent = $Total.textContent;
    $overlay_lista
      .querySelector(".lista-content-lista")
      .appendChild(clone_total);

    d.querySelector(".lista-content-lista")
      .querySelectorAll(".producto-list")
      .forEach((e) => {
        if (
          recordar.includes(
            e.querySelector(".nombre-producto-lista").textContent
          )
        ) {
          e.querySelector("i").classList.remove("bx-circle");

          e.querySelector("i").classList.add("bx-check-circle");
          e.querySelector(".nombre-producto-lista").style.textDecoration =
            "line-through";
          e.querySelector(".cantidad-producto-lista").style.textDecoration =
            "line-through";
          e.querySelector(".precio-producto-lista").style.textDecoration =
            "line-through";
          e.style.backgroundColor = "rgba(18, 78, 0,0.5)";
        }
      });
  }

  Mode(confirm_mode);
});

$close_window_lista.addEventListener("click", () => {
  const elementos = document.querySelectorAll(".nom-folder");

  // Accede al último elemento de la lista
  const ultimoElemento = elementos[elementos.length - 1];
  ultimoElemento.click();
  $overlay_lista.classList.remove("active");
  $popup_lista.classList.remove("active");
});

function tachar() {
  const tacharBtn = d.createElement("i");
  tacharBtn.classList.add("bx");
  tacharBtn.classList.add("bx-circle");

  tacharBtn.classList.add("tachar");

  tacharBtn.addEventListener("click", (e) => {
    if (tacharBtn.classList.contains("bx-circle")) {
      tacharBtn.classList.remove("bx-circle");
      tacharBtn.classList.add("bx-check-circle");
      e.target.parentNode.parentNode.querySelector(
        ".nombre-producto-lista"
      ).style.textDecoration = "line-through";
      e.target.parentNode.parentNode.querySelector(
        ".cantidad-producto-lista"
      ).style.textDecoration = "line-through";
      e.target.parentNode.parentNode.querySelector(
        ".precio-producto-lista"
      ).style.textDecoration = "line-through";
      e.target.parentNode.parentNode.style.backgroundColor =
        "rgba(18, 78, 0,0.5)";
    } else {
      tacharBtn.classList.add("bx-circle");
      tacharBtn.classList.remove("bx-check-circle");
      e.target.parentNode.parentNode.querySelector(
        ".nombre-producto-lista"
      ).style.textDecoration = "none";
      e.target.parentNode.parentNode.querySelector(
        ".cantidad-producto-lista"
      ).style.textDecoration = "none";
      e.target.parentNode.parentNode.querySelector(
        ".precio-producto-lista"
      ).style.textDecoration = "none";
      e.target.parentNode.parentNode.style.backgroundColor = "transparent";
    }

    recordar = [];
    d.querySelectorAll(".bx-check-circle").forEach((e) => {
      recordar.push(
        e.parentNode.parentNode.querySelector(".nombre-producto-lista")
          .textContent
      );
    });
    //console.log(recordar);
  });

  return tacharBtn;
}
