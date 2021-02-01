import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import resetPwd from "./images/resetPwd.png";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import axios from "axios";

function ResetPassword() {
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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "cPassword") setCPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    setError(error);
    if (error) return;

    axios
      .post("http://localhost:5000/resetpwd", {
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          history.push("/Login");
        }
      });
  };

  const validate = () => {
    let error = "";

    if (
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
      ).test(password)
    )
      error = "";
    else
      error =
        "Password should contain Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";

    return error;
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
                  error={error ? true : false}
                  helperText={error ? error : null}
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
                  error={password !== cPassword ? true : false}
                  helperText={
                    password !== cPassword ? "Passwords do not match" : null
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
