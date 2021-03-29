import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import verifyCode from "../../assets/images/verifyCode.png";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Backdrop,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/Actions/resetPassword";
import ReplayIcon from "@material-ui/icons/Replay";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../Apis/api";
import { useStyles } from "./loginCSS";

function VerifyCode(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recoveryEmail } = props.location;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleClick = () => {
    const error = validate();
    setError(error);
    if (error) return;

    api
      .post()
      .verifyOtp2({
        userEmail: recoveryEmail,
        otp: otp,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(verifyOtp());
          history.push({
            pathname: "/ResetPassword",
            recoveryEmail,
          });
        } else {
          setError("Invalid Otp");
        }
      });
  };

  const validate = () => {
    let error = "";
    if (otp.length !== 6) error = "Otp should contain 6 digits";
    return error;
  };

  const handleResend = () => {
    setIndicatorOpen(true);
    setButtonStatus(true);

    api
      .post()
      .forgotPassword({
        userEmail: recoveryEmail,
      })
      .then((response) => {
        setIndicatorOpen(false);
        setButtonStatus(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const [indicatorOpen, setIndicatorOpen] = React.useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  return (
    <>
      <LoggedOutNavbar />
      <Grid container className={classes.container}>
        <Grid
          item
          md={6}
          className={classes.image}
          container
          justify="center"
          alignItems="center"
        >
          <img src={verifyCode} alt="verify" style={{ width: "80%" }} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          container
          justify="center"
          alignItems="center"
        >
          <Paper elevation={5} className={classes.paperStyle}>
            <Grid align="center">
              <h2 className={classes.margin}>Enter the code</h2>
              <p className={classes.margin}>
                If the entered email address matches any account registered with
                us, we will send u a mail. So, Check your Mailbox
              </p>
              <TextField
                label="Enter the code sent"
                fullWidth
                required
                className={classes.margin}
                name="otp"
                value={otp}
                type="number"
                onChange={handleChange}
                error={error ? true : false}
                helperText={error ? error : null}
              />
              {/* indicator for please wait */}
              <Backdrop className={classes.backdrop} open={indicatorOpen}>
                <CircularProgress className={classes.circularProgress} />
                <Typography variant="h5">Please wait</Typography>
              </Backdrop>
              <Typography className={classes.margin} align="right">
                <Button
                  size="small"
                  endIcon={
                    <ReplayIcon
                      style={{
                        color: "#E94364",
                      }}
                    />
                  }
                  onClick={handleResend}
                >
                  Resend OTP{" "}
                </Button>
              </Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleClick}
                disabled={buttonStatus}
              >
                Verify
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default VerifyCode;
