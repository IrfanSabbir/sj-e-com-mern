import React, { useState, useEffect } from "react";
import { Paper, Button, Grid, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const result = await axios.get(
        process.env.REACT_APP_BASE_URL + `user_api/product/`,
        { headers: headers }
      );
      setProducts(result.data.body);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setProducts([]);

      alert(error.response.data.message);
    }
  };

  if (loader) return <p>Loading....</p>;

  return (
    <Container fixed style={{ marginTop: "20px", width: "100%" }}>
      <h2>
        <strong>Products List</strong>
      </h2>
      <Grid container spacing={3}>
        {products.map((product, key) => {
          return (
            <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
              <Paper
                variant="elevation"
                elevation={3}
                style={{ textAlign: "center" }}
              >
                {product.thumbnail ? (
                  <img
                    src={process.env.REACT_APP_BASE_URL + product.thumbnail}
                    alt={product.title}
                    width="60%"
                    height="150px"
                    // height="auto"
                    style={{ borderRadius: "10px", paddingBottom: "30px" }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300"
                    alt={product.title}
                    width="60%"
                    height="150px"
                    // height="auto"
                    style={{ borderRadius: "10px", paddingBottom: "30px" }}
                  />
                )}
                <p>
                  Title: <b> {product.title}</b>
                </p>
                <Button
                  style={{ marginBottom: "20px", textTransform: "none" }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/product/details/${product._id}`)}
                >
                  Details Page
                </Button>
                <br />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProductList;
