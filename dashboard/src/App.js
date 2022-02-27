import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./conatiner/Layout/Layout";
import Login from "./conatiner/pages/auth/LogIn";
import SignUp from "./conatiner/pages/auth/SignUp";
import CreateProduct from "./conatiner/pages/products/createProduct";
import UpdateProduct from "./conatiner/pages/products/updateProduct";
import ProductList from "./conatiner/pages/products/productList";
function App() {
  const authToken = localStorage.getItem("token");

  let route = (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Layout>
  );

  if (authToken) {
    route = (
      <Layout>
        <Routes>
          <Route path="/create_product" element={<CreateProduct />} />
          <Route path="/update/:product_id" element={<UpdateProduct />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </Layout>
    );
  }

  return <div className="App">{route}</div>;
}

export default App;
