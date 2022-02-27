import React, { useState } from "react";
import { Container, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const signupHandler = (event) => {
    event.preventDefault();

    let headers = {
      "Content-Type": "application/json",
    };
    const inputData = {
      email,
      password,
      name,
    };
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "user_api/auth/signup",
        inputData,
        { headers: headers }
      )
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fixed style={{ marginTop: "20px" }}>
      <Paper variant="outlined" style={{ padding: "20px" }}>
        <h2>
          <strong>SignUp to dashboard</strong>
        </h2>
        <TextField
          variant="outlined"
          required
          type="text"
          size="small"
          style={{ width: "60%", margin: "10px" }}
          color="primary"
          onChange={(event) => setName(event.target.value)}
          label="Name"
          InputProps={{ style: { fontSize: 20 } }}
          placeholder="enter you name..."
        />
        <TextField
          variant="outlined"
          required
          type="email"
          size="small"
          style={{ width: "60%", margin: "10px" }}
          color="primary"
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          InputProps={{ style: { fontSize: 20 } }}
          placeholder="enter you mail..."
        />
        <TextField
          variant="outlined"
          required
          type="password"
          size="small"
          style={{ width: "60%", margin: "10px" }}
          color="primary"
          onChange={(event) => setpassword(event.target.value)}
          label="password"
          InputProps={{ style: { fontSize: 20 } }}
          placeholder="********"
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={signupHandler}
        >
          SignUp
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
