import React, { useState, useEffect } from "react";
import { Container, Paper, Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateFeedback from "./Feeback";

const ProductDetails = () => {
  const authToken = localStorage.getItem("token");

  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);

  const params = useParams();
  const { product_id } = params;

  const getProduct = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const result = await axios.get(
        process.env.REACT_APP_BASE_URL + `user_api/product/${product_id}`,
        { headers: headers }
      );

      setProduct(result.data.body.product_details);
      setFeedbacks(result.data.body.feedbacks);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) return <p>Loading....</p>;
  return (
    <Container fixed style={{ marginTop: "20px" }}>
      <Paper
        variant="outlined"
        style={{ padding: "20px", width: "70%", marginLeft: "15%" }}
      >
        <h2>Title: {product.title}</h2>
        {product.thumbnail ? (
          <img
            src={process.env.REACT_APP_BASE_URL + product.thumbnail}
            alt={product.title}
            width="40%"
            height="auto"
            style={{ borderRadius: "10px", paddingBottom: "30px" }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/300"
            alt={product.title}
            width="40%"
            height="auto"
            // height="auto"
            style={{ borderRadius: "10px", paddingBottom: "30px" }}
          />
        )}
        <br />
        <h4>Description: {product.description}</h4>
        <hr />
        {authToken && (
          <CreateFeedback
            product_id={product._id}
            setFeedbacks={setFeedbacks}
          />
        )}

        <h2>
          <strong>All Feedbacks</strong>
        </h2>
        <Grid container spacing={3}>
          {feedbacks.map((feedback, i) => {
            return (
              <Grid item xs={12} sm={6} lg={4}>
                <div
                  key={feedback._id}
                  style={{ textAlign: "left", padding: "15px" }}
                >
                  <p style={{ display: "flex" }}>
                    <b>{feedback.user_name}</b>
                    &nbsp; {feedback.createdAt.split("T")[0]}
                  </p>
                  <h4>{feedback.comment}</h4>

                  <hr />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
