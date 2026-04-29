const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px" }}>
      <img src={product.image} alt="" width="100" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;