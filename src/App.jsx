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

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
