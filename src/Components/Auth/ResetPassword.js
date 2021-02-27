import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import resetPwd from "./images/resetPwd.png";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import axios from "axios";

function ResetPassword(props) {
  const { recoveryEmail } = props.location;
  const history = useHistory();
  const paperStyle = {
    display: "flex",
    width: 380,
    flexDirection: "column",
    padding: "30px",
  };
  const margin = { marginTop: "20px" };

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setError] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "cPassword") setCPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setError(errors);
    if (errors) return;

    axios
      .put("http://localhost:8080/profile/resetpassword", {
        userEmail: recoveryEmail,
        newPassword: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          history.push("/login");
          window.alert("Password successfully changed");
        }
      });
  };

  const validate = () => {
    let errors = {};
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!strongRegex.test(password.trim())) {
      errors.password = "Enter a stronger password";
    }
    if (cPassword !== password || cPassword === "") {
      errors.cPassword = "Password is either empty or Passwords do not match";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  return (
    <>
      <LoggedOutNavbar />
      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={resetPwd} alt="reset" width="600px" height="600px" />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <form onSubmit={handleSubmit}>
            <Paper elevation={5} style={paperStyle}>
              <Grid align="center">
                <h2 style={{ marginTop: "20px" }}>Reset your Password</h2>
                <p style={margin}>create a new password</p>
                <TextField
                  label="Enter a new password"
                  type="password"
                  fullWidth
                  required
                  style={margin}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  error={errors && errors.password ? true : false}
                  helperText={
                    errors && errors.password ? errors.password : null
                  }
                />
                <TextField
                  label="Confirm the new password"
                  type="password"
                  fullWidth
                  required
                  style={margin}
                  name="cPassword"
                  value={cPassword}
                  onChange={handleChange}
                  error={errors && errors.cPassword ? true : false}
                  helperText={
                    errors && errors.cPassword ? errors.cPassword : null
                  }
                />
                <Button
                  variant="contained"
                  type="submit"
                  style={{ marginTop: "20px", backgroundColor: "#E94364" }}
                >
                  Reset
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default ResetPassword;
