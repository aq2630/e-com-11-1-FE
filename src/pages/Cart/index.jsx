import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CartContext from "../../Context/CartContext";
import { useContext } from "react";
import "./cart.css";
import { Archive } from "react-bootstrap-icons";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, removeFromCart, addToCart } = cartContext;

  return (
    <div>
      <Container>
        {cartItems.length ? (
          cartItems.map((item, index) => (
            <div key={index} className="cartRoot">
              <img src={item.image} />
              <h6>{item.productName}</h6>
              <h6>{item.price}</h6>
              <Archive
                className="removeIcon"
                onClick={() => removeFromCart(item.productName)}
              />
            </div>
          ))
        ) : (
          <div>
            <p>No Items in Cart</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
