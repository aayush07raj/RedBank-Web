import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import forgotPwd from "./images/forgotPwd.png";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import Joi from "joi";
import axios from "axios";

function ForgotPassword() {
  const history = useHistory();
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [error, setError] = useState("");

  const paperStyle = {
    display: "flex",
    width: 380,
    flexDirection: "column",
    padding: "30px",
  };
  const margin = { marginTop: "20px" };

  const handleChange = (e) => {
    setRecoveryEmail(e.target.value);
  };

  const validate = () => {
    let error = "";
    if (
      new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(recoveryEmail)
    )
      error = "";
    else error = "Invalid email address";

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setError(error);
    if (error) return;

    axios
      .post("http://localhost:5000/forgotpassword", {
        recoveryEmail: recoveryEmail,
      })
      .then((response) => {
        if (response.data.success) {
          history.push("/VerifyCode");
        } else {
          setError(response.data.error);
        }
      });

    console.log("submitted");
  };

  return (
    <>
      <LoggedOutNavbar />
      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={forgotPwd} alt="fgtpwd" width="800px" height="600px" />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <form onSubmit={handleSubmit}>
            <Paper elevation={5} style={paperStyle}>
              <Grid align="center">
                <h2 style={{ marginTop: "20px" }}>Find your Account</h2>
                <p style={margin}>
                  Help us find your account by entering your registered email.
                </p>
                <TextField
                  label="Recovery Email"
                  name="recoveryEmail"
                  type="email"
                  value={recoveryEmail}
                  onChange={handleChange}
                  fullWidth
                  required
                  style={margin}
                  error={error ? true : false}
                  helperText={error ? error : null}
                />
                <Button
                  variant="contained"
                  type="submit"
                  style={{ marginTop: "20px", backgroundColor: "#E94364" }}
                >
                  Next
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPassword;
