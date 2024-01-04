export default function Product({ product, productName }) {
  return (
    <div className="product-reg-content">
      <div className="referencia_producto" style={{ display: "none" }}></div>
      <div className="tool-product"></div>

      <div className="nom-product">{productName}</div>
      <div className="cuantificador-content">
        <div className="cant-product">3</div>
        <div className="space-cuant"></div>
      </div>

      <div className="insertPeso">
        $<div className="precio-product">{product.precio}</div>
      </div>

      <div className="enlace-product">
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          google.com
        </a>
      </div>
      <div className="nota-product"></div>
    </div>
  );
}
