import { db } from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default function Folders() {
  async function handleAddFolder() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="folders">
      <div className="folder folder-primario">
        <div className="nom-folder">Inventario 1</div>
        <div className="delete-folder"></div>
        <div className="ref-folder" style={{ display: "none" }}>
          1
        </div>
      </div>
      <div className="add-folder" onClick={handleAddFolder}>
        <i className="bx bx-plus"></i>
      </div>
    </div>
  );
}
