import { useContext } from "react";
import Dashboard from "./Dashboard";
import Folders from "./Folders";
import { ThemeContext } from "../context/themeContext";

export default function Guide() {
  const { theme } = useContext(ThemeContext);
  return <main>Guía de uso</main>;
}
