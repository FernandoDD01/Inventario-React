import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, Doughnut } from "react-chartjs-2";

export default function GraphicCircle({ folders, total_price }) {
  const randomColor = () => {
    const colors = [
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

  if (folders.length === 0) {
    names = ["No hay folders"];
  } else {
    folders.forEach((folder) => {
      names.push(folder.Nombre);
      border_color.push(randomColor());
      if (folder.Categorias.length === 0) {
        porcion += 0;
      } else {
        folder.Categorias.forEach((categoria) => {
          if (Object.values(categoria)[0].Productos.length === 0) {
            porcion += 0;
          } else {
            Object.values(categoria)[0].Productos.forEach((producto) => {
              porcion +=
                parseFloat(producto.Precio) * parseFloat(producto.Cantidad);
            });
          }
        });
      }
      size.push((porcion * 100) / total_price);
      porcion = 0;
    });

    border_color.forEach((border) => {
      color.push(modifyColorOpacity(border));
    });
  }
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
        label: "Tamaño del folder",
        data: size,
        backgroundColor: color,
        borderColor: border_color,
        borderWidth: 2,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}
