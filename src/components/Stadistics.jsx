import { useContext } from "react";
import Dashboard from "./Dashboard";
import Folders from "./Folders";
import { ThemeContext } from "../context/themeContext";
import GraphicCircle from "./GraphicCircle";

export default function Stadistics() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`${theme.darkmode ? "dark" : "light"}`}>
      <GraphicCircle></GraphicCircle>
    </main>
  );
}
