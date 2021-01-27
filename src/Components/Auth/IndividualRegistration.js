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
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import individual from "./images/individual.png";
import states from "./states.json";
import Joi from "joi";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";

function IndividualRegistration() {
  const [data, setData] = useState({
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
    terms: false,
  });

  const history = useHistory();
  const [errors, setErrors] = useState({});

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
    const { error } = formSchema.validate(data, {
      abortEarly: false,
    });

    if (!error) return null;

    const allErrors = {};
    for (let err of error.details) {
      allErrors[err.path[0]] = err.message;
    }
    return allErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        states.states.findIndex((item) => item.state === value)
      );
    }

    const allErrors = { ...errors };
    const errorMsg = validateProperty(e.target);
    if (errorMsg) {
      allErrors[name] = errorMsg;
    } else {
      delete allErrors[name];
    }
    const updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
    setErrors(allErrors);
  };

  const handleTermsCheck = (e) => {
    const updatedData = { ...data };
    updatedData[e.target.name] = e.target.checked;
    const allErrors = { ...errors };
    setData(updatedData);
    setErrors(allErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    setErrors({ errors: errors || {} });
    if (errors) return;

    console.log(data);
    history.push("/home");
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
    phone: Joi.number().min(10).positive().required(),
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
    terms: Joi.boolean().required().invalid(false),
  };

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

              <InputLabel style={{ marginTop: "35px" }}>
                Date of Birth
              </InputLabel>
              <TextField
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

              <FormControl style={margin}>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  onChange={handleChange}
                  value={data.state}
                  error={errors && errors.state}
                  helperText={errors && errors.state ? errors.state : null}
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
                  value={data.district}
                  error={errors && errors.district}
                  helperText={
                    errors && errors.district ? errors.district : null
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

              <FormControl style={margin}>
                <InputLabel>Blood Group</InputLabel>
                <Select name="bg" onChange={handleChange} value={data.bg}>
                  error={errors && errors.bg}
                  helperText=
                  {errors && errors.bg ? errors.bg : null}
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
                error={data.password !== data.cPassword ? true : false}
                helperText={
                  data.password !== data.cPassword
                    ? "passwords do not match"
                    : null
                }
              />

              <FormControlLabel
                style={margin}
                control={
                  <Checkbox
                    onChange={handleTermsCheck}
                    inputProps={{ required: true }}
                    name="terms"
                  />
                }
                label="Accept Terms and Conditions"
              />
               <Link to="/terms" style={{ color: "#E94364", fontWeight: "bold" }}>
               (Click here for terms and condition) 
                </Link>

              <Button
                variant="contained"
                style={{ backgroundColor: "#E94364", marginTop: "20px" }}
                type="submit"
                disabled={validate()}
                onClick={handleSubmit}
              >
                Sign up
              </Button>

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