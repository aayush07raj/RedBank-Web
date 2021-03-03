import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import login from "./images/login.png";
import avatar from "./images/avatar.png";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import Joi from "joi";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { logging } from "../../redux/Actions/login";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const paperStyle = {
    display: "flex",
    width: 380,
    flexDirection: "column",
    padding: "30px",
  };
  const margin = { marginTop: "20px" };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) return;

    axios
      .post("http://localhost:8080/authenticate", {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
        dispatch(
          logging({
            userType: response.data.userType,
            userToken: response.data.userToken,
            userId: response.data.userId,
          })
        );
        const cookies = new Cookies();
        cookies.set(
          "Auth",
          {
            userType: response.data.userType,
            userToken: response.data.userToken,
            userId: response.data.userId,
          },
          { path: "/" }
        );

        history.push("/home");
      })
      .catch(function (error) {
        setErrors({
          email: "Email / Password is invalid",
          password: "Email / Password is invalid",
        });
      });
  };

  const validate = () => {
    const errors = {};

    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email.trim())) {
      errors.email = "Email is either empty or invalid";
    }
    if (!data.password) {
      errors.password = "Password cannot be empty";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
  };

  return (
    <>
      <LoggedOutNavbar />

      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid
          item
          xs={false}
          sm={6}
          container
          justify="center"
          alignItems="center"
        >
          <img src={login} alt="#" />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          container
          justify="center"
          alignItems="center"
        >
          <Paper style={paperStyle} elevation={5}>
            <Grid align="center">
              <img alt="" src={avatar} width="80px" />
              <h2 style={{ marginTop: "10px" }}>Sign In</h2>
            </Grid>

            <TextField
              label="Email"
              placeholder="Enter your email"
              type="email"
              fullWidth
              variant="outlined"
              style={margin}
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors && errors.email}
              helperText={errors && errors.email ? errors.email : null}
            />

            <TextField
              label="Password"
              placeholder="Enter your password"
              type="password"
              fullWidth
              variant="outlined"
              style={margin}
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors && errors.password}
              helperText={errors && errors.password ? errors.password : null}
            />

            <Typography style={margin} align="right">
              <Link to="/ForgotPassword">Forgot password </Link>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px", backgroundColor: "#E94364" }}
              onClick={handleSubmit}
            >
              Login
            </Button>

            <Grid align="center">
              <Typography style={margin}>
                <p>
                  New user ? <Link to="/Options">Sign up</Link>
                </p>
              </Typography>
              {/* <h3 style={margin}>OR</h3>
              <Typography style={margin}>
                <Link to="/Options">Sign in with google account</Link>
              </Typography> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
