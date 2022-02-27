import React, { useState } from "react";
import { Container, Paper, TextField, Button, Switch } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [title, setTitile] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState();
  const [inputRef, setInputRef] = useState(null);

  const history = useNavigate();

  const productHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    let headers = {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer " + token
    }
    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('status', status)
    formData.append('image', image)
    axios.post(
      process.env.REACT_APP_BASE_URL + "admin_api/product",
      formData,
      { headers: headers }
    )
      .then((result) => {
        console.log(result);
        history('/list')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileSelectHandler = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])

  }

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
          style={{ width: "60%", margin: "10px" }}
          color="primary"
          onChange={(event) => setTitile(event.target.value)}
          label="title"
          InputProps={{ style: { fontSize: 20 } }}
          placeholder="enter titile..."
        />
        <p >status <Switch
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          name="status"
          style={{ fontSize: "50px" }}
          color="primary"
        /> </p>
        <TextField
          variant="outlined" required type="text"
          label="description" multiline rows={4}
          InputProps={{ style: { fontSize: 20 } }}
          size="small"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description...."
          style={{ width: "60%", margin: "10px" }}
        /> <br />
        <input type="file"
          style={{ display: 'none' }}
          onChange={fileSelectHandler}
          accept=".jpg,.png,.jpeg"
          ref={inputRef => setInputRef(inputRef)}
        />
        <Button
          variant="outlined" color="info"
          onClick={() => inputRef.click()}
        >Upload Image</Button> {image ? image.name : "Select profile image"}
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

export default CreateProduct;
