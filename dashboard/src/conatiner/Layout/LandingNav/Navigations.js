import React, { useState, useEffect } from "react";

import { Container, Button, Grid } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import "./Navigation.css";

const Navigations = (props) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    authToken && setToken(authToken);
  }, []);
  return (
    <>
      {!token ? (
        <div className="Toolbar">
          <Container className="Container" style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none", marginRight: "20px" }}
            >
              <NavLink
                to="/"
                className="RightLink"
                style={{ textDecoration: "none" }}
              >
                Log in
              </NavLink>
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
            >
              <NavLink
                to="/signup"
                className="RightLink"
                style={{ textDecoration: "none" }}
              >
                Sign up
              </NavLink>
            </Button>
          </Container>
        </div>
      ) : (
        <>
          <div className="Toolbar">
            <Container className="Container" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ textTransform: "none" }}
                onClick={() => {
                  setToken("");
                  localStorage.removeItem("token");
                  navigate("/");
                  window.location.reload(false);
                }}
              >
                Log out
              </Button>
            </Container>
          </div>
          <Container fixed>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={3}>
                <div style={{ textAlign: "left", marginTop: "30px" }}>
                  <p>
                    <NavLink
                      to="/list"
                      className="RightLink"
                      style={{ textDecoration: "none", color: "tomato" }}
                    >
                      Product List
                    </NavLink>
                  </p>
                  <p>
                    <NavLink
                      to="/create_product"
                      className="RightLink"
                      style={{ textDecoration: "none", color: "tomato" }}
                    >
                      Create Product
                    </NavLink>
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={9}
                style={{ textAlign: "center" }}
              >
                {props.children}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Navigations;
