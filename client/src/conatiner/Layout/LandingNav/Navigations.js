import React, { useState, useEffect } from "react";

import { Container, Button } from "@mui/material";
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
          <Container className="Container">
            <div style={{ textAlign: "left" }}>
              <NavLink
                to="/"
                className="RightLink"
                style={{ textDecoration: "none", marginTop: "10px" }}
              >
                Home Page
              </NavLink>
            </div>
            <div style={{ textAlign: "right", marginTop: "-25px" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none", marginRight: "20px" }}
              >
                <NavLink
                  to="/login"
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
            </div>
          </Container>
        </div>
      ) : (
        <>
          <div className="Toolbar">
            <Container className="Container" style={{ textAlign: "right" }}>
              <div style={{ textAlign: "left" }}>
                <NavLink
                  to="/"
                  className="RightLink"
                  style={{ textDecoration: "none", marginTop: "10px" }}
                >
                  Home Page
                </NavLink>
              </div>
              <div style={{ textAlign: "right", marginTop: "-25px" }}>
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
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Navigations;
