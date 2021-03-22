import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import forgotPwd from "../../assets/images/forgotPwd.png";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import {
  Grid,
  Paper,
  TextField,
  Button,
  LinearProgress,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../Apis/api";
import {useStyles} from "./loginCSS";



function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [error, setError] = useState("");

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

    setIndicatorOpen(true);

    api
      .post()
      .forgotPassword({
        userEmail: recoveryEmail,
      })
      .then((response) => {
        if (response.data.success) {
          setIndicatorOpen(false);
          history.push({
            pathname: "/VerifyCode",
            recoveryEmail,
          });
        } else {
          setIndicatorOpen(false);
          setError("Sorry, email doesn't exist");
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const [buttonStatus, setButtonStatus] = useState(false);
  const [indicatorOpen, setIndicatorOpen] = React.useState(false);

  return (
    <>
      <LoggedOutNavbar />
      <Grid
        container
        className={classes.container}
      >
        <Grid item md={6} className={classes.image} container justify="center" alignItems="center">
          <img src={forgotPwd} alt="fgtpwd" width="800px" height="600px" />
        </Grid>

        <Grid item xs={12} md={6} container justify="center" alignItems="center">
          <form onSubmit={handleSubmit}>
            <Paper elevation={5} className={classes.paperStyle}>
              <Grid align="center">
                <h2 className={classes.margin}>Find your Account</h2>
                <p className={classes.margin}>
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
                  className={classes.margin}
                  error={error ? true : false}
                  helperText={error ? error : null}
                />

                <Button
                  variant="contained"
                  type="submit"
                  className={classes.button}
                  disabled={buttonStatus}
                >
                  Next
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>

        {/* indicator for please wait */}
        <Backdrop className={classes.backdrop} open={indicatorOpen}>
          <CircularProgress className={classes.circularProgress} />
          <Typography variant="h5">Please wait</Typography>
        </Backdrop>
      </Grid>
    </>
  );
}

export default ForgotPassword;
