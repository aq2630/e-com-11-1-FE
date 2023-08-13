import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CartContext from "../../Context/CartContext";
import { useContext, useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Product = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const cartContext = useContext(CartContext);
  const { removeFromCart, addToCart } = cartContext;
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchSingleProduct = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const data = await response.json();
    setSingleProduct(data.product);
    setLoading(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    navigate("/");
  };

  useEffect(() => {
    fetchSingleProduct();
    const isUser = localStorage.getItem("user");
    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <div>
      <Container>
        {loading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            {user ? (
              <div>
                <IconButton onClick={() => navigate(`/products/edit/${id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <></>
            )}

            <h3>{singleProduct.productName}</h3>
            <img src={singleProduct.image} />
            <h3>Rs. {singleProduct.price}</h3>
            <p>{singleProduct.description}</p>
            <Button onClick={() => addToCart(singleProduct)} variant="primary">
              Add to Cart
            </Button>
            <Button
              onClick={() => removeFromCart(singleProduct.productName)}
              variant="primary"
            >
              Remove
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default Product;
