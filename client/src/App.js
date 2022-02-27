import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./conatiner/Layout/Layout";
import ProductList from "./conatiner/pages/products/productList";
import ProductDetails from "./conatiner/pages/products/productDetails.jsx";
import Login from "./conatiner/pages/auth/LogIn";
import SignUp from "./conatiner/pages/auth/SignUp";

function App() {
  let route = (
    <Layout>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product/details/:product_id"
          element={<ProductDetails />}
        />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Layout>
  );

  return <div className="App">{route}</div>;
}

export default App;
