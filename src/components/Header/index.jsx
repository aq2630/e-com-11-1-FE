import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import { Cart } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import CartContext from "../../Context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to={"/"}>
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20220213013322"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button variant="primary" onClick={() => navigate("/cart")}>
          <Badge bg="warning">{cartItems.length}</Badge>
          <Cart />
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
