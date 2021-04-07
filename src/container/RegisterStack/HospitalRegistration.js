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
import api from "../../Apis/api";
import { useStyles } from "./registerCSS";

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

  const dispatch = useDispatch();
  const history = useHistory();

  // filling the form data
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "terms") {
      const updatedData = { ...data };
      updatedData[e.target.name] = e.target.checked;
      setData(updatedData);
      const error = validateField(name, value);
      const updatedErrors = { ...errors };
      updatedErrors[name] = error;
      setErrors(updatedErrors);
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
      const error = validateField(name, value);
      const updatedErrors = { ...errors };
      updatedErrors[name] = error;
      setErrors(updatedErrors);
    }
  };

  const handleNumberChange = (e, id) => {
    const updatedData = { ...data };
    updatedData.phone[id] = e.target.value;
    setData(updatedData);

    const { name, value } = e.target;
    const error = validateField("phone", value);
    if (error) {
      setErrors((prevState) => {
        const updatedPhoneErrors = [...prevState.phone];
        updatedPhoneErrors[id] = error;
        return { ...prevState, phone: updatedPhoneErrors };
      });
    } else {
      setErrors((prevState) => {
        const updatedPhoneErrors = [...prevState.phone];
        updatedPhoneErrors[id] = "";
        return { ...prevState, phone: updatedPhoneErrors };
      });
    }
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
    const errors = {
      name: "",
      email: "",
      license: "",
      phone: ["", "", "", "", ""],
      address: "",
      state: "",
      district: "",
      pincode: "",
      password: "",
      cPassword: "",
      terms: "",
    };

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
    for (let i = 0; i < data.phone.length; i++) {
      if (data.phone[i].length !== 10) {
        errors.phone[i] = "Invalid Phone number";
      } else {
        errors.phone[i] = "";
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const validateField = (fieldName, fieldValue) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    var error = "";

    if (
      fieldName === "name" &&
      (fieldValue.trim() === "" ||
        fieldValue.trim().length < 3 ||
        fieldValue.trim().length > 20)
    ) {
      error = " Username is either empty or invalid ";
    } else if (
      fieldName === "email" &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        fieldValue.trim()
      )
    ) {
      error = "Email is either empty or invalid";
    } else if (
      fieldName === "license" &&
      !/^(?=.{5,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$/.test(
        fieldValue.trim()
      )
    ) {
      error = " License is either empty or invalid ";
    } else if (fieldName === "address" && fieldValue.trim() === "") {
      error = "Address cannot be empty";
    } else if (fieldName === "state" && fieldValue === "") {
      error = "State cannot be empty";
    } else if (fieldName === "district" && fieldValue === "") {
      errors = "District cannot be empty";
    } else if (
      fieldName === "pincode" &&
      !/^[1-9][0-9]{5}$/.test(fieldValue.trim())
    ) {
      error = "Invalid pincode format";
    } else if (
      fieldName === "password" &&
      !strongRegex.test(fieldValue.trim())
    ) {
      error =
        "Use 8 or more characters with a mix of letters, numbers & symbols";
    } else if (
      fieldName === "cPassword" &&
      (fieldValue !== data.password || fieldValue === "")
    ) {
      error = "Password is either empty or Passwords do not match";
    } else if (fieldName === "terms" && !fieldValue) {
      error = "Please accept our terms and conditions";
    } else if (fieldName === "phone" && !/^\d{10}$/.test(fieldValue.trim())) {
      error = "Invalid Phone number";
    }

    return error === "" ? null : error;
  };

  const [touched, setTouched] = useState([false, false, false, false, false]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setTouched([true, true, true, true, true]);

    setErrors(errors);
    if (errors) return;

    // showing progress bar
    setIndicatorOpen(true);

    // sending otp to user email
    api
      .post()
      .sendOtp({
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
    api
      .post()
      .verifyOtp({
        userEmail: data.email,
        otp: data.otp,
      })
      .then((response) => {
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

          api
            .post()
            .registerHos(reqBody)
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

      <Grid container className={classes.container}>
        <Grid
          item
          md={6}
          className={classes.image}
          container
          justify="center"
          alignItems="center"
        >
          <img src={hospital} alt="hospital" style={{ maxWidth: "100%" }} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          container
          justify="center"
          alignItems="center"
        >
          <form>
            <Paper className={classes.paperStyle} elevation={5}>
              <h2 className={classes.header} align="center">
                Hospital Registration
              </h2>

              <TextField
                label="Name"
                placeholder="Enter your full name"
                type="text"
                fullWidth
                className={classes.margin}
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
                className={classes.margin}
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
                className={classes.margin}
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
                  className={classes.margin}
                  name={`phone${idx}`}
                  value={val}
                  onChange={(e) => {
                    handleNumberChange(e, idx);
                  }}
                  key={idx}
                  inputProps={{
                    maxLength: 10,
                  }}
                  error={errors.phone[idx] !== "" ? true : false}
                  helperText={errors.phone[idx] !== "" ? errors.phone[idx] : ""}
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
                className={classes.margin}
                name="address"
                value={data.address}
                onChange={handleChange}
                error={errors && errors.address ? true : false}
                helperText={errors && errors.address ? errors.address : null}
              />

              <FormControl
                className={classes.margin}
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
                className={classes.margin}
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
                className={classes.margin}
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
                className={classes.margin}
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
                className={classes.margin}
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
                className={classes.margin}
                control={<Checkbox onChange={handleChange} name="terms" />}
                label={
                  errors && errors.terms
                    ? errors.terms
                    : "Accept Terms and Conditions"
                }
              />
              <Link to="/terms" className={classes.link}>
                (Click here for terms and condition)
              </Link>
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              {/* indicator for please wait */}
              <Backdrop className={classes.backdrop} open={indicatorOpen}>
                <CircularProgress className={classes.progress} />
                <Typography variant="h5">Please wait</Typography>
              </Backdrop>

              <Typography align="center" className={classes.margin}>
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
