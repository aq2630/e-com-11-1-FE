import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CartContext from "../../Context/CartContext";
import { useContext } from "react";

const ProductCard = ({ product, key }) => {
  console.log("product", product);
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext;
  return (
    <Card key={key} className="cardRoot">
      <Card.Img
        variant="top"
        src={`http://localhost:8000/${product.image.split("public/")[1]}`}
      />
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title>{product.productName}</Card.Title>
        </Link>
        <Card.Text>Rs. {product.price}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
