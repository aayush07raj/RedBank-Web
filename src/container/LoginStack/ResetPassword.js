import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import resetPwd from "../../assets/images/resetPwd.png";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/Actions/resetPassword";
import api from "../../Apis/api";

function ResetPassword(props) {
  const dispatch = useDispatch();
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

    api
      .put()
      .resetPassword({
        userEmail: recoveryEmail,
        newPassword: password,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(resetPassword());
          setOpen(true);
        }
      });
  };

  const validate = () => {
    let errors = {};
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!strongRegex.test(password.trim())) {
      errors.password =
        "Use 8 or more characters with a mix of letters, numbers & symbols";
    }
    if (cPassword !== password || cPassword === "") {
      errors.cPassword = "Password is either empty or Passwords do not match";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // dialog for success
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    history.push("/login");
    setOpen(false);
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
                <p style={margin}>Create a new password</p>
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
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#E94364",
                    color: "white",
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Password changed successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

export default ResetPassword;
