import Dashboard from "./Dashboard";
import Folders from "./Folders";

import { ViewProvider } from "../context/viewContext";
import { CategoryProvider } from "../context/categoryContext";

export default function Main() {
  return (
    <main>
      <CategoryProvider>
        <ViewProvider>
          <Folders />
          <Dashboard />
        </ViewProvider>
      </CategoryProvider>
    </main>
  );
}
