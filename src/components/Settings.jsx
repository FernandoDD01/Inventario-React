import { useContext } from "react";
import Dashboard from "./Dashboard";
import Folders from "./Folders";
import { ThemeContext } from "../context/themeContext";

export default function Settings() {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={`${theme.darkmode ? "dark" : "light"}`}>Ajustes</main>
  );
}
