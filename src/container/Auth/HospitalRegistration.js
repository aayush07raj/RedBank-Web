import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  FormHelperText,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Backdrop,
  CircularProgress,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import hospital from "../../assets/images/hospital.jpg";
import states from "../../assets/json/statesWithoutAll.json";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import axios from "axios";
import { logging } from "../../redux/Actions/login";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function HospitalRegistration(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    email: "",
    license: "",
    phone: [""],
    address: "",
    state: "",
    district: "",
    pincode: "",
    password: "",
    cPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    license: "",
    phone: [""],
    address: "",
    state: "",
    district: "",
    pincode: "",
    password: "",
    cPassword: "",
    terms: "",
  });

  const reqBody = {
    name: "",
    email: "",
    licenseNumber: "",
    phone: [""],
    address: "",
    state: "",
    district: "",
    pincode: "",
    password: "",
  };
  const [otpError, setOtpError] = useState("");
  const [maxLimit, setMaxLimit] = useState("Add a phone number");
  const [enable, setEnable] = useState(true);
  const [visibility, setVisibility] = useState("visible");
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const paperStyle = {
    height: "auto",
    width: "450px",
    display: "flex",
    flexDirection: "column",
    padding: "30px",
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const margin = { marginTop: "15px" };

  // filling the form data
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

  const handleNumberChange = (e, id) => {
    const updatedData = { ...data };
    updatedData.phone[id] = e.target.value;
    setData(updatedData);
  };

  const handleAdd = () => {
    if (data.phone.length < 5) {
      setData((prevState) => ({
        ...prevState,
        phone: [...prevState.phone, ""],
      }));
    }
  };

  const handleDelete = () => {
    if (data.phone.length > 1) {
      setVisibility("visible");
      setData((prevState) => {
        const newState = { ...prevState };
        newState.phone.pop();
        return newState;
      });
    }
  };

  // submission and validation
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
    if (
      !/^(?=.{5,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$/.test(
        data.license.trim()
      )
    ) {
      errors.license = " License is either empty or invalid ";
    }
    if (data.address.trim() === "") {
      errors.address = "Address cannot be empty";
    }
    if (data.state === "") {
      errors.state = "State cannot be empty";
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
    if (data.phone.length >= 1 && !data.phone[0]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (data.phone.length >= 2 && !data.phone[1]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (data.phone.length >= 3 && !data.phone[2]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (data.phone.length >= 4 && !data.phone[3]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (data.phone.length >= 5 && !data.phone[4]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };
  const [touched, setTouched] = useState([false, false, false, false, false]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    const errors = validate();
    setTouched([true, true, true, true, true]);
    console.log(errors);
    setErrors(errors);
    if (errors) return;

    // showing progress bar
    setIndicatorOpen(true);

    // sending otp to user email
    axios
      .post("http://localhost:8080/verification/sendotp", {
        userEmail: data.email,
      })
      .then((response) => {
        console.log(response);
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
        console.log(response);
        if (response.data.success) {
          reqBody.name = data.name;
          reqBody.email = data.email;
          reqBody.licenseNumber = data.license;
          reqBody.phone = data.phone;
          reqBody.address = data.address;
          reqBody.state = data.state;
          reqBody.district = data.district;
          reqBody.pincode = data.pincode;
          reqBody.password = data.password;

          axios
            .post("http://localhost:8080/registerhos", reqBody)
            .then(function (response) {
              console.log(response);
              if (response.data.userToken) {
                console.log("works");
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
          <img src={hospital} alt="hospital" style={{ maxWidth: "100%" }} />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <form>
            <Paper style={paperStyle} elevation={5}>
              <h2 style={{ marginTop: "10px" }} align="center">
                Hospital Registration
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
                error={errors && errors.name ? true : false}
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
                error={errors && errors.email ? true : false}
                helperText={errors && errors.email ? errors.email : null}
              />

              <TextField
                label="License Number"
                placeholder="Enter your license number"
                type="text"
                fullWidth
                style={margin}
                name="license"
                value={data.license}
                onChange={handleChange}
                error={errors && errors.license ? true : false}
                helperText={errors && errors.license ? errors.license : null}
              />

              {data.phone.map((val, idx) => (
                <TextField
                  label={`Phone-${idx + 1}`}
                  placeholder="Enter your phone number"
                  type="text"
                  fullWidth
                  style={margin}
                  name={`phone${idx}`}
                  value={val}
                  onChange={(e) => {
                    handleNumberChange(e, idx);
                    setTouched((prevState) => {
                      let newState = [...prevState];
                      newState[idx] = true;
                      return newState;
                    });
                  }}
                  key={idx}
                  inputProps={{
                    maxLength: 10,
                  }}
                  error={!data.phone[idx] && touched[idx] ? true : false}
                  helperText={
                    !data.phone[idx] && touched[idx] ? errors.phone : ""
                  }
                />
              ))}
              <div>
                <ButtonGroup variant="text" color="default" align="center">
                  {data.phone.length < 5 ? (
                    <Button onClick={handleAdd}>{maxLimit}</Button>
                  ) : null}
                  {data.phone.length === 1 ? null : (
                    <Button
                      onClick={handleDelete}
                      style={{ visibility: `${visibility}` }}
                    >
                      Delete phone number
                    </Button>
                  )}
                </ButtonGroup>
              </div>

              <TextField
                label="Registered Address"
                placeholder="Enter your registered address"
                type="text"
                fullWidth
                style={margin}
                name="address"
                value={data.address}
                onChange={handleChange}
                error={errors && errors.address ? true : false}
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
                error={errors && errors.pincode ? true : false}
                helperText={errors && errors.pincode ? errors.pincode : null}
              />

              <TextField
                label="Password"
                placeholder="Create your password"
                type="password"
                fullWidth
                style={margin}
                name="password"
                value={data.password}
                onChange={handleChange}
                inputProps={{
                  maxLength: 30,
                }}
                error={errors && errors.password ? true : false}
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
                style={{
                  backgroundColor: "#e33371",
                  marginTop: "20px",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
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
              <Button color="inherit" onClick={handleClose2}>
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

export default HospitalRegistration;