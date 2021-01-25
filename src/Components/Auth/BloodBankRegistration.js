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
import hospital from "./images/bloodbank.jpg";
import states from "./states.json";
import Joi from "joi";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";

function BloodBankRegistration() {
  const [state, setState] = useState({
    data: {
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
    },
    errors: {},
  });

  const [maxLimit, setMaxLimit] = useState("Add a phone number");
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

    if (name === "checked") {
      setState((prevState) => ({
        ...prevState,
        [name]: e.target.checked,
      }));
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

  const handleSubmit = () => {
    const errors = validate();

    setState({ errors: errors || {} });
    if (errors) return;

    console.log(state);
  };

  const schema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      })
      .required(),
    license: Joi.string().required(),
    phone: Joi.array().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number()
      .positive()
      .min(6)
      .message("Pincode must contain 6 digits")
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("Enter a stronger password")
      .required(),
    cPassword: Joi.ref("password"),
  };

  const handleNumberChange = (e, id) => {
    setState((prevState) => {
      const newPhoneState = [...prevState.data.phone];
      newPhoneState[id] = e.target.value;
      return {
        data: { ...state.data, phone: newPhoneState },
      };
    });
  };

  const handleAdd = () => {
    if (state.data.phone.length < 5) {
      setState((prevState) => ({
        data: { ...prevState.data, phone: [...prevState.data.phone, ""] },
      }));
    } else {
      setMaxLimit("Maximum limit reached");
    }
  };

  return (
    <>
      <LoggedOutNavbar />

      <Grid container style={{ margin: "20px auto" }}>
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={hospital} alt="hospital" style={{ maxWidth: "100%" }} />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <Paper style={paperStyle} elevation={5}>
            <h2 style={{ marginTop: "10px" }} align="center">
              Blood-bank Registration
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

            <TextField
              label="License Number"
              placeholder="Enter your license number"
              type="text"
              fullWidth
              style={margin}
              name="license"
              value={state.data.license}
              onChange={handleChange}
              error={state.errors && state.errors.license}
              helperText={
                state.errors && state.errors.license
                  ? state.errors.license
                  : null
              }
            />

            {state.data.phone.map((val, idx) => (
              <TextField
                label="Phone"
                placeholder="Enter your phone number"
                type="number"
                fullWidth
                style={margin}
                name="phone"
                value={val}
                onChange={(e) => {
                  handleNumberChange(e, idx);
                }}
                key={idx}
                error={state.errors && state.errors.phone}
                helperText={
                  state.errors && state.errors.phone ? state.errors.phone : null
                }
              />
            ))}
            <Button onClick={handleAdd}>{maxLimit}</Button>

            <TextField
              label="Registered Address"
              placeholder="Enter your registered address"
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
              >
                {states.states.map((item, id) => (
                  <MenuItem value={item.state} key={id}>
                    {item.state}
                  </MenuItem>
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
              >
                {states.states[selectedStateIndex].districts.map((item, id) => (
                  <MenuItem value={item} key={id}>
                    {item}
                  </MenuItem>
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
              error={state.errors && state.errors.cPassword}
              helperText={
                state.errors && state.errors.cPassword
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
              {" "}
              <Link to="/home">Sign up</Link>
            </Button>

            <Typography align="center" style={margin}>
              <p>
                By Signing up, you are{" "}
                <Link to="/terms" style={{ color: "#E94364", fontWeight: "bold" }}>
                  accepting to our terms of service
                </Link>
              </p>
            </Typography>

            <Typography align="center" style={margin}>
              <Link to="/Login">Already a user ? Sign in</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default BloodBankRegistration;