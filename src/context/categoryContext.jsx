import { createContext, useState } from "react";

const CategoryContext = createContext();
const initialCategories = {};

const CategoryProvider = ({ children }) => {
  const [auxCategory, setAuxCategory] = useState(initialCategories);

  function handleAuxCategory(nombreFolder) {
    console.log("Se paso el nombre del folder", nombreFolder);
    setAuxCategory(nombreFolder);
  }

  const data = { auxCategory, handleAuxCategory };

  return (
    <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
  );
};

export { CategoryProvider };
export default CategoryContext;
