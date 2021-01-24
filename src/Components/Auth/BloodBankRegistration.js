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
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    }),
    license: Joi.required(),
    phone: Joi.array().required(),
    address: Joi.required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number()
      .min(6)
      .message("Pincode must contain 6 digits")
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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

            <TextField
              label="License Number"
              placeholder="Enter your license number"
              type="text"
              fullWidth
              required
              style={margin}
              name="license"
              value={state.data.license}
              onChange={handleChange}
            />
            {state.errors && state.errors.license ? (
              <p style={{ color: "red" }}> {state.errors.license} </p>
            ) : null}

            {state.data.phone.map((val, idx) => (
              <TextField
                label="Phone"
                placeholder="Enter your phone number"
                type="number"
                fullWidth
                required
                style={margin}
                name="phone"
                value={val}
                onChange={(e) => {
                  handleNumberChange(e, idx);
                }}
                key={idx}
              />
            ))}
            <Button onClick={handleAdd}>{maxLimit}</Button>
            {state.errors && state.errors.phone ? (
              <p style={{ color: "red" }}> {state.errors.phone} </p>
            ) : null}

            <TextField
              label="Registered Address"
              placeholder="Enter your registered address"
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
                {states.states.map((item, id) => (
                  <MenuItem value={item.state} key={id}>
                    {item.state}
                  </MenuItem>
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
                {states.states[selectedStateIndex].districts.map((item, id) => (
                  <MenuItem value={item} key={id}>
                    {item}
                  </MenuItem>
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
