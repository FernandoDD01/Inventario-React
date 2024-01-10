import { useContext } from "react";
import Dashboard from "./Dashboard";
import Folders from "./Folders";
import { ThemeContext } from "../context/themeContext";

//import { folders as initialFolders } from "../mookData.json/data.json";

export default function Main() {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={`${theme.darkmode ? "dark" : "light"}`}>
      <Folders />
      <Dashboard />
    </main>
  );
}
