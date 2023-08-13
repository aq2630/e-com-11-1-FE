import "./home.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Skeleton from "@mui/material/Skeleton";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8000/products/all");
    const data = await response.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Container>
        <h1>Home page</h1>

        {loading ? (
          <>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </>
        ) : (
          <>
            <div className="productWrapper">
              {products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
