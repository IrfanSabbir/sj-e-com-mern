import React, { useState, useEffect } from "react";
import { Container, Paper, TextField, Button, Switch } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [loader, setLoader] = useState(false);
  const [title, setTitile] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbNail] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState();
  const [inputRef, setInputRef] = useState(null);

  const params = useParams();
  const { product_id } = params;

  const history = useNavigate();
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduct = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const result = await axios.get(
        process.env.REACT_APP_BASE_URL + `admin_api/product/${product_id}`,
        { headers: headers }
      );

      const product = result.data.body;
      setTitile(product.title);
      setDescription(product.description);
      setStatus(product.status);
      setThumbNail(product.thumbnail);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const productHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    let headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    image && formData.append("image", image);
    axios
      .put(
        process.env.REACT_APP_BASE_URL + "admin_api/product/" + product_id,
        formData,
        { headers: headers }
      )
      .then((result) => {
        history("/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileSelectHandler = (e) => {
    setImage(e.target.files[0]);
  };
  if (loader) return <p>Loading....</p>;
  return (
    <Container fixed style={{ marginTop: "20px" }}>
      <Paper variant="outlined" style={{ padding: "20px" }}>
        <h2>
          <strong>Login to dashboard</strong>
        </h2>
        <TextField
          variant="outlined"
          required
          type="text"
          size="small"
          value={title}
          style={{ width: "60%", margin: "10px" }}
          color="primary"
          onChange={(event) => setTitile(event.target.value)}
          label="title"
          InputProps={{ style: { fontSize: 20 } }}
          placeholder="enter titile..."
        />
        <p>
          status{" "}
          <Switch
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            name="status"
            style={{ fontSize: "50px" }}
            color="primary"
          />{" "}
        </p>
        <TextField
          variant="outlined"
          required
          type="text"
          label="description"
          multiline
          rows={4}
          value={description}
          InputProps={{ style: { fontSize: 20 } }}
          size="small"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description...."
          style={{ width: "60%", margin: "10px" }}
        />{" "}
        <br />
        {thumbnail && !image && (
          <img
            src={process.env.REACT_APP_BASE_URL + thumbnail}
            alt={title}
            width="60%"
            height="auto"
            style={{ borderRadius: "10px", paddingBottom: "30px" }}
          />
        )}
        <br />
        <input
          type="file"
          style={{ display: "none" }}
          onChange={fileSelectHandler}
          accept=".jpg,.png,.jpeg"
          ref={(inputRef) => setInputRef(inputRef)}
        />
        <Button
          variant="outlined"
          color="info"
          onClick={() => inputRef.click()}
        >
          Upload Image
        </Button>{" "}
        {image ? image.name : "Update Thumbnail"}
        <br />
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          size="large"
          onClick={productHandler}
        >
          Submit Product
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
