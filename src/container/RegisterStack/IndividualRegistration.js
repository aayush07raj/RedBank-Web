import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import individual from "../../assets/images/individual.png";
import states from "../../assets/json/statesWithoutAll.json";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import { useSelector, useDispatch } from "react-redux";
import registerIndividual from "../../redux/Actions/registerIndividual";
import axios from "axios";
import { logging } from "../../redux/Actions/login";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function IndividualRegistration(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    email: "",
    dob: "2021-03-01",
    phone: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    bloodGroup: "",
    password: "",
    cPassword: "",
    terms: false,
    otp: "",
  });

  const reqBody = {};
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    bloodGroup: "",
    password: "",
    cPassword: "",
    terms: "",
  });
  const [otpError, setOtpError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const paperStyle = {
    height: "auto",
    width: "450px",
    display: "flex",
    flexDirection: "column",
    padding: "30px",
  };
  const margin = { marginTop: "15px" };

  const validate = () => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    const errors = {};

    if (
      data.name.trim() === "" ||
      data.name.trim().length < 3 ||
      data.name.trim().length > 20
    ) {
      errors.name = " Username is either empty or invalid ";
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email.trim()
      )
    ) {
      errors.email = "Email is either empty or invalid";
    }
    if (data.address.trim() === "") {
      errors.address = "Address cannot be empty";
    }
    if (data.state === "") {
      errors.state = "State cannot be empty";
    }
    if (data.bloodGroup === "") {
      errors.bloodGroup = "Blood Group cannot be empty";
    }
    if (data.district === "") {
      errors.district = "District cannot be empty";
    }
    if (!/^[1-9][0-9]{5}$/.test(data.pincode.trim())) {
      errors.pincode = "Invalid pincode format";
    }
    if (!strongRegex.test(data.password.trim())) {
      errors.password =
        "Use 8 or more characters with a mix of letters, numbers & symbols";
    }
    if (data.cPassword !== data.password || data.cPassword === "") {
      errors.cPassword = "Password is either empty or Passwords do not match";
    }
    if (!data.terms) {
      errors.terms = "Please accept our terms and conditions";
    }

    let age = new Date().getFullYear() - new Date(data.dob).getFullYear();
    const m = new Date().getMonth() - new Date(data.dob).getMonth();
    if (
      m < 0 ||
      (m === 0 && new Date().getDate() < new Date(data.dob).getDate())
    ) {
      age--;
    }
    if (age < 18 || age > 65) {
      errors.dob = "User must be between 18 and 65 of age";
    }

    if (!/^\d{10}$/.test(data.phone.trim())) {
      errors.phone = "Invalid Phone number";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "terms") {
      const updatedData = { ...data };
      updatedData[e.target.name] = e.target.checked;
      setData(updatedData);
    } else {
      if (name === "state") {
        setEnable(false);
        setSelectedStateIndex(
          states.states.findIndex((item) => item.state === value)
        );
      }
      const updatedData = { ...data };
      updatedData[name] = value;
      setData(updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors);
    if (errors) return;

    setIndicatorOpen(true);

    // sending otp to user email
    axios
      .post("http://localhost:8080/verification/sendotp", {
        userEmail: data.email,
      })
      .then((response) => {
        if (response.data.success) {
          setIndicatorOpen(false);
          handleClickOpen2();
        } else {
          setIndicatorOpen(false);
          handleClickOpen();
        }
      });
  };

  const handleClose2 = () => {
    axios
      .post("http://localhost:8080/verification/verifyotp", {
        userEmail: data.email,
        otp: data.otp,
      })
      .then((response) => {
        if (response.data.success) {
          // making a request object to send to the backend
          reqBody.name = data.name;
          reqBody.email = data.email;
          reqBody.dob = new Date(data.dob).toLocaleDateString();
          reqBody.phone = data.phone;
          reqBody.address = data.address;
          reqBody.state = data.state;
          reqBody.district = data.district;
          reqBody.pincode = data.pincode;
          reqBody.bloodGroup = data.bloodGroup;
          reqBody.password = data.password;

          axios
            .post("http://localhost:8080/registerind", reqBody)
            .then(function (response) {
              if (response.data.userToken) {
                dispatch(
                  logging({
                    isLoggedIn: true,
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
              } else {
                handleClickOpen();
              }
            })
            .catch(function (error) {
              window.alert(error.message);
            });
          setOpen2(false);
        } else {
          setOtpError("Invalid Otp");
        }
      });
  };

  const changeEmail = () => {
    setOpen2(false);
  };

  // dialog for already registered email
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // dialog for otp validation for correct email
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const [indicatorOpen, setIndicatorOpen] = React.useState(false);

  return (
    <>
      <LoggedOutNavbar />

      <Grid container style={{ margin: "20px auto" }}>
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={individual} alt="individual" style={{ maxWidth: "100%" }} />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <form>
            <Paper style={paperStyle} elevation={5}>
              <h2 style={{ marginTop: "10px" }} align="center">
                Individual Registration
              </h2>

              <TextField
                label="Name"
                placeholder="Enter your full name"
                type="text"
                fullWidth
                style={margin}
                name="name"
                value={data.name}
                onChange={handleChange}
                inputProps={{
                  maxLength: 30,
                }}
                error={errors && errors.name}
                helperText={errors && errors.name ? errors.name : null}
              />

              <TextField
                label="Email"
                placeholder="Enter your email"
                type="email"
                fullWidth
                style={margin}
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors && errors.email}
                helperText={errors && errors.email ? errors.email : null}
              />

              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                style={margin}
                name="dob"
                value={data.dob}
                onChange={handleChange}
                error={errors && errors.dob}
                helperText={errors && errors.dob ? errors.dob : null}
              />

              <TextField
                label="Phone"
                placeholder="Enter your phone number"
                type="text"
                fullWidth
                style={margin}
                name="phone"
                value={data.phone}
                onChange={handleChange}
                inputProps={{
                  maxLength: 10,
                }}
                error={errors && errors.phone}
                helperText={errors && errors.phone ? errors.phone : null}
              />

              <TextField
                label="Current Address"
                placeholder="Enter your current address"
                type="text"
                fullWidth
                style={margin}
                name="address"
                value={data.address}
                onChange={handleChange}
                error={errors && errors.address}
                helperText={errors && errors.address ? errors.address : null}
              />

              <FormControl
                style={margin}
                error={errors && errors.state ? true : false}
              >
                <InputLabel>Select your State</InputLabel>
                <Select
                  label="Select your State"
                  name="state"
                  onChange={handleChange}
                  value={data.state}
                >
                  {states.states.map((item, id) => (
                    <MenuItem value={item.state} key={id}>
                      {item.state}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors && errors.state ? errors.state : null}
                </FormHelperText>
              </FormControl>

              <FormControl
                style={margin}
                error={errors && errors.district ? true : false}
              >
                <InputLabel>Select your District</InputLabel>
                <Select
                  label="Select your District"
                  inputProps={{ readOnly: enable }}
                  name="district"
                  value={data.district}
                  onChange={handleChange}
                >
                  {states.states[selectedStateIndex].districts.map(
                    (item, id) => (
                      <MenuItem key={id} value={item}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText>
                  {errors && errors.district ? errors.district : null}
                </FormHelperText>
              </FormControl>

              <TextField
                label="Pincode"
                placeholder="Enter your pincode"
                type="text"
                fullWidth
                style={margin}
                name="pincode"
                value={data.pincode}
                onChange={handleChange}
                inputProps={{
                  maxLength: 6,
                }}
                error={errors && errors.pincode}
                helperText={errors && errors.pincode ? errors.pincode : null}
              />

              <FormControl
                style={margin}
                error={errors && errors.bloodGroup ? true : false}
              >
                <InputLabel>Select your Blood Group</InputLabel>
                <Select
                  label="Select your Blood Group"
                  name="bloodGroup"
                  onChange={handleChange}
                  value={data.bloodGroup}
                >
                  <MenuItem value={"A+"}>A+</MenuItem>
                  <MenuItem value={"A-"}>A-</MenuItem>
                  <MenuItem value={"B+"}>B+</MenuItem>
                  <MenuItem value={"B-"}>B-</MenuItem>
                  <MenuItem value={"AB+"}>AB+</MenuItem>
                  <MenuItem value={"AB-"}>AB-</MenuItem>
                  <MenuItem value={"O+"}>O+</MenuItem>
                  <MenuItem value={"O-"}>O-</MenuItem>
                </Select>
                <FormHelperText>
                  {errors && errors.bloodGroup ? errors.bloodGroup : null}
                </FormHelperText>
              </FormControl>

              <TextField
                label="Password"
                placeholder="Create your password"
                type="password"
                fullWidth
                style={margin}
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors && errors.password}
                helperText={errors && errors.password ? errors.password : null}
              />

              <TextField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                fullWidth
                style={margin}
                name="cPassword"
                value={data.cPassword}
                onChange={handleChange}
                inputProps={{
                  maxLength: 30,
                }}
                error={errors && errors.cPassword ? true : false}
                helperText={
                  errors && errors.cPassword ? errors.cPassword : null
                }
              />

              <FormControlLabel
                style={margin}
                control={<Checkbox onChange={handleChange} name="terms" />}
                label={
                  errors && errors.terms
                    ? errors.terms
                    : "Accept Terms and Conditions"
                }
              />
              <Link
                to="/terms"
                style={{ color: "#E94364", fontWeight: "bold" }}
              >
                (Click here for terms and condition)
              </Link>

              <Button
                variant="contained"
                style={{ backgroundColor: "#E94364", marginTop: "20px" }}
                type="submit"
                onClick={handleSubmit}
              >
                Sign up
              </Button>

              {/* indicator for please wait */}
              <Backdrop className={classes.backdrop} open={indicatorOpen}>
                <CircularProgress
                  style={{ color: "#E94364", marginRight: "10px" }}
                />
                <Typography variant="h5">Please wait</Typography>
              </Backdrop>

              <Typography align="center" style={margin}>
                <Button
                  size="small"
                  onClick={(e) => {
                    history.push("/Login");
                  }}
                >
                  Already a user ? Sign in
                </Button>
              </Typography>
            </Paper>
          </form>

          {/* dialog for already registered email */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Email already exists</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Entered email is already associated with another account, please
                log in or enter some other email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>

          {/* dialog for otp validation for email registration */}
          <Dialog open={open2} onClose={handleClose2}>
            <DialogTitle>Email Validation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the otp sent to {data.email}
              </DialogContentText>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="otp"
                value={data.otp}
                onChange={handleChange}
                error={otpError.length != 0 ? true : false}
                helperText={otpError.length != 0 ? otpError : null}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="inherit">
                Verify
              </Button>
              <Button onClick={changeEmail} color="inherit">
                Change Email
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}

export default IndividualRegistration;
