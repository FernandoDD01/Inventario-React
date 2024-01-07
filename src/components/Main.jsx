import Dashboard from "./Dashboard";
import Folders from "./Folders";

//import { folders as initialFolders } from "../mookData.json/data.json";

export default function Main() {
  return (
    <main>
      <Folders />
      <Dashboard />
    </main>
  );
}
