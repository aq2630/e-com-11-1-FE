import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./addProduct.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  const fetchSingleProduct = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const data = await response.json();
    setSingleProduct(data.product);
    setLoading(false);
  };

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    setSingleProduct(() => {
      return {
        ...singleProduct,
        [name]: value,
      };
    });
  };

  const handleUpload = async (ev) => {
    const file = ev.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setImage(data.path);
  };

  const handleSubmit = async () => {
    const productData = { ...singleProduct };
    const response = await fetch(`http://localhost:8000/products/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJjYWZlY2MyYTM1M2NlMzgzNmE2Y2EiLCJpYXQiOjE2OTAwOTQ1NjQsImV4cCI6MTY5MjY4NjU2NH0.mRRJfx_UvpCPq0cxJSeOt7W12XfQyThQT3gORPxFmE0",
      },
      body: JSON.stringify(productData),
    });
    console.log("response", response);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <div>
      <Container className="rootContainer">
        <h4>Add Product Form</h4>
        <TextField
          fullWidth
          value={singleProduct.productName}
          onChange={handleChange}
          name="productName"
          variant="outlined"
        />
        <TextField
          fullWidth
          onChange={handleChange}
          value={singleProduct.price}
          name="price"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={singleProduct.description}
          onChange={handleChange}
          multiline
          rows={4}
          name="description"
          id="outlined-basic"
          variant="outlined"
        />
        <TextField
          fullWidth
          onChange={handleUpload}
          name="image"
          type="file"
          id="outlined-basic"
          variant="outlined"
        />
        <Button onClick={handleSubmit} fullWidth variant="contained">
          Add Product
        </Button>
      </Container>
    </div>
  );
};

export default EditProduct;
