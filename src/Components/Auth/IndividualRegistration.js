import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import individual from "./images/individual.png";
import states from "./states.json";
import Joi from "joi";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";

function IndividualRegistration() {
  const [state, setState] = useState({
    data: {
      name: "",
      email: "",
      dob: "",
      phone: "",
      address: "",
      state: "",
      district: "",
      pincode: "",
      bg: "",
      password: "",
      cPassword: "",
    },
    errors: {},
  });

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

  const validateProperty = ({ name, value }) => {
    const inputField = { [name]: value };
    const fieldSchema = Joi.object({ [name]: schema[name] });
    const { error } = fieldSchema.validate(inputField);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const formSchema = Joi.object(schema);
    const { error } = formSchema.validate(state.data, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let err of error.details) {
      errors[err.path[0]] = err.message;
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        states.states.findIndex((item) => item.state === value)
      );
    }

    const errors = { ...state.errors };
    const errorMsg = validateProperty(e.target);
    if (errorMsg) {
      errors[e.target.name] = errorMsg;
    } else {
      delete errors[e.target.name];
    }
    const data = { ...state.data };
    data[e.target.name] = e.target.value;
    setState({ data, errors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    setState({ errors: errors || {} });
    if (errors) return;

    console.log(state.data);
  };

  const schema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
      .required(),
    dob: Joi.date()
      .less("1-1-2003")
      .message("must be between 18-56 years")
      .greater("1-1-1957")
      .message("must be between 18-56 years"),
    phone: Joi.number().positive().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number()
      .positive()
      .min(6)
      .message("Pincode must contain 6 digits")
      .required(),
    bg: Joi.required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("Enter a stronger password")
      .required(),
    cPassword: Joi.ref("password"),
  };

  return (
    <>
      <LoggedOutNavbar />

      <Grid container style={{ margin: "20px auto" }}>
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={individual} alt="individual" style={{ maxWidth: "100%" }} />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <form onSubmit={handleSubmit}>
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
                value={state.data.name}
                onChange={handleChange}
                error={state.errors && state.errors.name}
                helperText={
                  state.errors && state.errors.name ? state.errors.name : null
                }
              />

              <TextField
                label="Email"
                placeholder="Enter your email"
                type="email"
                fullWidth
                style={margin}
                name="email"
                value={state.data.email}
                onChange={handleChange}
                error={state.errors && state.errors.email}
                helperText={
                  state.errors && state.errors.email ? state.errors.email : null
                }
              />

              <InputLabel style={{ marginTop: "35px" }}>
                Date of Birth
              </InputLabel>
              <TextField
                type="date"
                fullWidth
                style={margin}
                name="dob"
                value={state.data.dob}
                onChange={handleChange}
                error={state.errors && state.errors.dob}
                helperText={
                  state.errors && state.errors.dob ? state.errors.dob : null
                }
              />

              <TextField
                label="Phone"
                placeholder="Enter your phone number"
                type="number"
                fullWidth
                style={margin}
                name="phone"
                value={state.data.phone}
                onChange={handleChange}
                error={state.errors && state.errors.phone}
                helperText={
                  state.errors && state.errors.phone ? state.errors.phone : null
                }
              />

              <TextField
                label="Current Address"
                placeholder="Enter your current address"
                type="text"
                fullWidth
                style={margin}
                name="address"
                value={state.data.address}
                onChange={handleChange}
                error={state.errors && state.errors.address}
                helperText={
                  state.errors && state.errors.address
                    ? state.errors.address
                    : null
                }
              />

              <FormControl style={margin}>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  onChange={handleChange}
                  value={state.data.state}
                  error={state.errors && state.errors.state}
                  helperText={
                    state.errors && state.errors.state
                      ? state.errors.state
                      : null
                  }
                >
                  {states.states.map((item) => (
                    <MenuItem value={item.state}>{item.state}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl style={margin}>
                <InputLabel>District</InputLabel>
                <Select
                  inputProps={{ readOnly: enable }}
                  name="district"
                  onChange={handleChange}
                  value={state.data.district}
                  error={state.errors && state.errors.district}
                  helperText={
                    state.errors && state.errors.district
                      ? state.errors.district
                      : null
                  }
                >
                  {states.states[selectedStateIndex].districts.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Pincode"
                placeholder="Enter your pincode"
                type="number"
                fullWidth
                style={margin}
                name="pincode"
                value={state.data.pincode}
                onChange={handleChange}
                error={state.errors && state.errors.pincode}
                helperText={
                  state.errors && state.errors.pincode
                    ? state.errors.pincode
                    : null
                }
              />

              <FormControl style={margin}>
                <InputLabel>Blood Group</InputLabel>
                <Select name="bg" onChange={handleChange} value={state.data.bg}>
                  error={state.errors && state.errors.bg}
                  helperText=
                  {state.errors && state.errors.bg ? state.errors.bg : null}
                  <MenuItem value={"A+"}>A+</MenuItem>
                  <MenuItem value={"A-"}>A-</MenuItem>
                  <MenuItem value={"B+"}>B+</MenuItem>
                  <MenuItem value={"B-"}>B-</MenuItem>
                  <MenuItem value={"AB+"}>AB+</MenuItem>
                  <MenuItem value={"AB-"}>AB-</MenuItem>
                  <MenuItem value={"O+"}>O+</MenuItem>
                  <MenuItem value={"O-"}>O-</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Password"
                placeholder="Create your password"
                type="password"
                fullWidth
                style={margin}
                name="password"
                value={state.data.password}
                onChange={handleChange}
                error={state.errors && state.errors.password}
                helperText={
                  state.errors && state.errors.password
                    ? state.errors.password
                    : null
                }
              />

              <TextField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                fullWidth
                style={margin}
                name="cPassword"
                value={state.data.cPassword}
                onChange={handleChange}
                error={
                  state.data.password !== state.data.cPassword ? true : false
                }
                helperText={
                  state.data.password !== state.data.cPassword
                    ? "passwords do not match"
                    : null
                }
              />

              <Button
                variant="contained"
                style={{ backgroundColor: "#E94364", marginTop: "20px" }}
                type="submit"
                disabled={validate()}
              >
                <Link to="/home">Sign up</Link>
              </Button>

              <Typography align="center" style={margin}>
                <p>
                  By Signing up, you are{" "}
                  <Link
                    to="/terms"
                    style={{ color: "#E94364", fontWeight: "bold" }}
                  >
                    ACCEPTING OUR TERMS AND CONDITIONS
                  </Link>
                </p>
              </Typography>

              <Typography align="center" style={margin}>
                <Link to="/Login">Already a user ? Sign in</Link>
              </Typography>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default IndividualRegistration;
