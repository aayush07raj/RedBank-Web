import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import login from "./images/login.png";
import avatar from "./images/avatar.png";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import Joi from "joi";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import logging from "../../redux/Actions/login";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loggedInState, setLoggedInState] = useState({
    isLoggedIn: false,
    userType: "",
  });

  const paperStyle = {
    display: "flex",
    width: 380,
    flexDirection: "column",
    padding: "30px",
  };

  const margin = { marginTop: "20px" };

  const schema = {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("Enter a stronger password")
      .required(),
  };

  useEffect(() => {
    dispatch(logging(loggedInState));
  }, [loggedInState]);

  const handleClick = (e) => {
    e.preventDefault();
    const errors = validate();

    setErrors({ errors: errors || {} });
    if (errors) return;

    axios
      .post("http://localhost:5000/login", {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        if (response.data.success) {
          console.log(response.data.userToken);
          const newState = { ...loggedInState };
          newState.isLoggedIn = true;
          newState.userType = response.data.userType;
          localStorage.setItem("JWTtoken", response.data.userToken);
          setLoggedInState(newState);
          history.push("/home");
        } else {
          if (response.data.error.includes("email")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: response.data.error,
            }));
          } else if (response.data.error.includes("password")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: response.data.error,
            }));
          }
        }
      })
      .catch(function (error) {
        window.alert(error.message);
      });
  };

  const validateProperty = ({ name, value }) => {
    const inputField = { [name]: value };
    const fieldSchema = Joi.object({ [name]: schema[name] });
    const { error } = fieldSchema.validate(inputField);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const formSchema = Joi.object(schema);
    const { error } = formSchema.validate(data, {
      abortEarly: false,
    });

    if (!error) return null;

    const allErrors = {};
    for (let err of error.details) {
      allErrors[err.path[0]] = err.message;
    }
    return allErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const allErrors = { ...errors };
    const errorMsg = validateProperty(e.target);
    if (errorMsg) {
      allErrors[name] = errorMsg;
    } else {
      delete allErrors[name];
    }
    const updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
    setErrors(allErrors);
  };

  return (
    <>
      <LoggedOutNavbar />

      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={login} alt="#" />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
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
              required
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
              required
              variant="outlined"
              style={margin}
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors && errors.password}
              helperText={errors && errors.password ? errors.password : null}
            />

            <Typography style={margin}>
              <Link to="/ForgotPassword">Forgot password</Link>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px", backgroundColor: "#E94364" }}
              onClick={handleClick}
              disabled={validate() ? true : false}
            >
              Login
            </Button>

            <Grid align="center">
              <Typography style={margin}>
                <p>
                  New user ? <Link to="/Options">Sign up</Link>
                </p>
              </Typography>
              <h3 style={margin}>OR</h3>
              <Typography style={margin}>
                <Link to="/Options">Sign in with google account</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
