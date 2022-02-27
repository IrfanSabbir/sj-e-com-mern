import React, { useState } from "react";
import { Container, Paper, TextField, Button } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const loginHandler = (event) => {
    event.preventDefault();

    let headers = {
      "Content-Type": "application/json",
    };
    const inputData = {
      email,
      password,
    };
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "admin_api/auth/login",
        inputData,
        { headers: headers }
      )
      .then((result) => {
        localStorage.setItem("token", result.data.token);
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
          <strong>Login to dashboard</strong>
        </h2>
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
          onClick={loginHandler}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
