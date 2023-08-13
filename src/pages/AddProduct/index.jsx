import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./addProduct.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    if (name == "productName") {
      setProductName(value);
    }
    if (name == "price") {
      setPrice(value);
    }
    if (name == "description") {
      setDescription(value);
    }
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
    const productData = { productName, price: +price, description, image };
    const response = await fetch("http://localhost:8000/products/add", {
      method: "POST",
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
  });

  return (
    <div>
      <Container className="rootContainer">
        <h4>Add Product Form</h4>
        <TextField
          fullWidth
          value={productName}
          onChange={handleChange}
          name="productName"
          label="product Name"
          variant="outlined"
        />
        <TextField
          fullWidth
          onChange={handleChange}
          value={price}
          name="price"
          label="price"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={description}
          onChange={handleChange}
          multiline
          rows={4}
          name="description"
          id="outlined-basic"
          label="Description"
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

export default AddProduct;
