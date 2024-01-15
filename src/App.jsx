import "./css/App.css";
import "./css/Tools.css";
import "./css/Folders.css";
import "./css/modo-lista.css";
import "./css/overlay-popup.css";
import "./css/popup-add-category.css";
import "./css/popup-add-folder.css";
import "./css/popup-add-product.css";
import "./css/popup-delete-prod.css";
import "./css/popup-delete-folder.css";
import "./css/popup-delete.css";
import "./css/popup-edit-category.css";
import "./css/popup-edit-product.css";
import "./css/popup-nota.css";
import "./css/template-products.css";
import "./css/guide-styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { FoldersProvider } from "./context/foldersContext";
import { ViewProvider } from "./context/viewContext";
import { ThemeProvider } from "./context/themeContext";
import Aside from "./components/Aside";
import Stadistics from "./components/Stadistics";
import Guide from "./components/Guide";
import Settings from "./components/Settings";
import Error404 from "./components/Error404";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Aside />

          <FoldersProvider>
            <ViewProvider>
              <div className="main">
                <Header />

                <Routes>
                  <Route path="/" element={<Main />}></Route>
                  <Route path="/inventario" element={<Main />}></Route>
                  <Route path="/estadisticas" element={<Stadistics />}></Route>
                  <Route path="/guia" element={<Guide />}></Route>
                  <Route path="/ajustes" element={<Settings />}></Route>
                  <Route path="*" element={<Error404></Error404>}></Route>
                </Routes>

                <Footer />
              </div>
            </ViewProvider>
          </FoldersProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
