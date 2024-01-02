import Tools from "./Tools";

export default function Header() {
  return (
    <header>
      <div className="content-title">
        <div className="image">
          <img src="./foto-despensa.png" alt="Despensa" />
        </div>
        <div className="title">
          <h2>INVENTARIO</h2>
        </div>
      </div>
      <Tools />
    </header>
  );
}
