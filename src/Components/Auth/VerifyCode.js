import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import verifyCode from "./images/verifyCode.png";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/Actions/resetPassword";
import ReplayIcon from "@material-ui/icons/Replay";

import axios from "axios";

function VerifyCode(props) {
  const dispatch = useDispatch();
  const { recoveryEmail } = props.location;
  const paperStyle = {
    display: "flex",
    width: 380,
    flexDirection: "column",
    padding: "30px",
  };
  const margin = { marginTop: "20px" };

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

    axios
      .post("http://localhost:8080/email/verifyotp", {
        userEmail: recoveryEmail,
        otp: otp,
      })
      .then((response) => {
        console.log(response);
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
    setProgress(true);
    setButtonStatus(true);

    axios
      .post("http://localhost:8080/email/sendotp", {
        userEmail: recoveryEmail,
      })
      .then((response) => {
        setProgress(false);
        setButtonStatus(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const [linearProgress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  return (
    <>
      <LoggedOutNavbar />
      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={verifyCode} alt="verify" style={{ width: "80%" }} />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <Paper elevation={5} style={paperStyle}>
            <Grid align="center">
              <h2 style={{ marginTop: "20px" }}>Enter the code</h2>
              <p style={margin}>
                If the entered email address matches any account registered with
                us, we will send u a mail. So, Check your Mailbox
              </p>
              <TextField
                label="Enter the code sent"
                fullWidth
                required
                style={margin}
                name="otp"
                value={otp}
                type="number"
                onChange={handleChange}
                error={error ? true : false}
                helperText={error ? error : null}
              />
              {/* //progress line till popup*/}
              {linearProgress === false ? null : (
                <LinearProgress color="secondary" style={margin} />
              )}
              <Typography style={margin} align="right">
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
                style={{
                  marginTop: "20px",
                  backgroundColor: "#E94364",
                  color: "white",
                }}
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
