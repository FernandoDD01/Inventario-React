import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, Doughnut } from "react-chartjs-2";

export default function GraphicCircleIndividual({ folders, folderName }) {
  const randomColor = () => {
    const colors = [
      "rgb(255, 0, 0)",
      "rgb(0, 255, 0)",
      "rgb(0, 0, 255)",
      "rgb(255, 255, 0)",
      "rgb(255, 0, 255)",
      "rgb(0, 255, 255)",
      "rgb(128, 0, 0)",
      "rgb(0, 128, 0)",
      "rgb(0, 0, 128)",
      "rgb(128, 128, 0)",
      "rgb(128, 0, 128)",
      "rgb(0, 128, 128)",
      "rgb(128, 128, 128)",
      "rgb(255, 165, 0)",
      "rgb(255, 192, 203)",
      "rgb(0, 255, 127)",
      "rgb(70, 130, 180)",
      "rgb(255, 99, 71)",
      "rgb(0, 128, 128)",
      "rgb(255, 20, 147)",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const modifyColorOpacity = (color) => {
    let rgb = color.toString();

    let valores = rgb
      .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
      .split(",");

    // Obtener los valores de rojo, verde y azul
    let rojo = parseInt(valores[0]);
    let verde = parseInt(valores[1]);
    let azul = parseInt(valores[2]);
    let opacidad = "0.7";

    // Construir el nuevo color RGBA
    color = "rgba(" + rojo + ", " + verde + ", " + azul + ", " + opacidad + ")";
    return color;
  };

  let names = [];
  let color = [];
  let border_color = [];
  let size = [];
  let porcion = 0;
  let subtotal = 0;

  console.log(folders);

  console.log(folderName);

  if (
    folders.find((folder) => {
      return folder.Nombre === folderName;
    }).Categorias.length === 0
  ) {
    names = ["No hay categorias"];
    subtotal += 0;
  } else {
    folders
      .find((folder) => {
        return folder.Nombre === folderName;
      })
      .Categorias.forEach((categoria) => {
        if (Object.values(categoria)[0].Productos.length === 0) {
          subtotal += 0;
        } else {
          Object.values(categoria)[0].Productos.forEach((producto) => {
            subtotal +=
              parseFloat(producto.Precio) * parseFloat(producto.Cantidad);
          });
        }
        console.log(subtotal);
      });

    folders
      .find((folder) => {
        return folder.Nombre === folderName;
      })
      .Categorias.forEach((categoria) => {
        porcion = 0;
        border_color.push(randomColor());
        names.push(Object.keys(categoria)[0]);

        if (Object.values(categoria)[0].Productos.length === 0) {
          porcion += 0;
        } else {
          Object.values(categoria)[0].Productos.forEach((producto) => {
            porcion +=
              parseFloat(producto.Precio) * parseFloat(producto.Cantidad);
          });
        }

        size.push((porcion * 100) / subtotal);
      });
  }

  console.log(size);
  border_color.forEach((border) => {
    color.push(modifyColorOpacity(border));
  });

  console.log(color);
  ChartJS.register(ArcElement, Tooltip, Legend);

  var options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  var data = {
    labels: names,
    datasets: [
      {
        label: "Porcentaje",
        data: size,
        backgroundColor: border_color,
        borderColor: border_color,
        borderWidth: 2,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}
