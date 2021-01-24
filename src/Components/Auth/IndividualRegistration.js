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
    dob: Joi.date().less("1-1-2077").greater("1-1-2003"),
    phone: Joi.number().positive().required(),
    address: Joi.required(),
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
      .message("Password must contain an uppercase, a lowercase and a digit")
      .required(),
    cPassword: Joi.any().valid(Joi.ref("password")).required(),
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
                required
                style={margin}
                name="name"
                value={state.data.name}
                onChange={handleChange}
              />
              {state.errors && state.errors.name ? (
                <p style={{ color: "red" }}> {state.errors.name} </p>
              ) : null}

              <TextField
                label="Email"
                placeholder="Enter your email"
                type="email"
                fullWidth
                required
                style={margin}
                name="email"
                value={state.data.email}
                onChange={handleChange}
              />
              {state.errors && state.errors.email ? (
                <p style={{ color: "red" }}> {state.errors.email} </p>
              ) : null}

              <InputLabel style={{ marginTop: "20px" }}>
                Date of Birth*
              </InputLabel>
              <TextField
                type="date"
                fullWidth
                required
                style={margin}
                name="dob"
                value={state.data.dob}
                onChange={handleChange}
              />
              {state.errors && state.errors.dob ? (
                <p style={{ color: "red" }}> {state.errors.dob} </p>
              ) : null}

              <TextField
                label="Phone"
                placeholder="Enter your phone number"
                type="number"
                fullWidth
                required
                style={margin}
                name="phone"
                value={state.data.phone}
                onChange={handleChange}
              />
              {state.errors && state.errors.phone ? (
                <p style={{ color: "red" }}> {state.errors.phone} </p>
              ) : null}

              <TextField
                label="Current Address"
                placeholder="Enter your current address"
                type="text"
                fullWidth
                required
                style={margin}
                name="address"
                value={state.data.address}
                onChange={handleChange}
              />
              {state.errors && state.errors.address ? (
                <p style={{ color: "red" }}> {state.errors.address} </p>
              ) : null}

              <FormControl style={margin}>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  onChange={handleChange}
                  value={state.data.state}
                >
                  {states.states.map((item) => (
                    <MenuItem value={item.state}>{item.state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {state.errors && state.errors.state ? (
                <p style={{ color: "red" }}> {state.errors.state} </p>
              ) : null}

              <FormControl style={margin}>
                <InputLabel>District</InputLabel>
                <Select
                  inputProps={{ readOnly: enable }}
                  name="district"
                  onChange={handleChange}
                  value={state.data.district}
                >
                  {states.states[selectedStateIndex].districts.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {state.errors && state.errors.district ? (
                <p style={{ color: "red" }}> {state.errors.district} </p>
              ) : null}

              <TextField
                label="Pincode"
                placeholder="Enter your pincode"
                type="number"
                fullWidth
                required
                style={margin}
                name="pincode"
                value={state.data.pincode}
                onChange={handleChange}
              />
              {state.errors && state.errors.pincode ? (
                <p style={{ color: "red" }}> {state.errors.pincode} </p>
              ) : null}

              <FormControl style={margin}>
                <InputLabel required>Blood Group</InputLabel>
                <Select name="bg" onChange={handleChange} value={state.data.bg}>
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
              {state.errors && state.errors.bg ? (
                <p style={{ color: "red" }}> {state.errors.bg} </p>
              ) : null}

              <TextField
                label="Password"
                placeholder="Create your password"
                type="password"
                fullWidth
                required
                style={margin}
                name="password"
                value={state.data.password}
                onChange={handleChange}
              />
              {state.errors && state.errors.password ? (
                <p style={{ color: "red" }}> {state.errors.password} </p>
              ) : null}

              <TextField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                fullWidth
                required
                style={margin}
                name="cPassword"
                value={state.data.cPassword}
                onChange={handleChange}
              />
              {state.errors && state.errors.cPassword ? (
                <p style={{ color: "red" }}> {state.errors.cPassword} </p>
              ) : null}

              <Button
                variant="contained"
                style={{ backgroundColor: "#E94364", marginTop: "20px" }}
                type="submit"
                disabled={validate()}
              >
                <Link to="/Login">Sign up</Link>
              </Button>

              <Typography align="center" style={margin}>
                <p>
                  By Signing up, you are{" "}
                  <span style={{ color: "#E94364", fontWeight: "bold" }}>
                    accepting to our terms of service
                  </span>
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
