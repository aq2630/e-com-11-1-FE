import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { CartContainer } from "./Context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import { ProductContainer } from "./Context/ProductContext";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContainer>
          <ProductContainer>
            <Header />
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </ProductContainer>
        </CartContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
