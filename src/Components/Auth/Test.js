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
  ButtonGroup,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import hospital from "./images/hospital.jpg";
import states from "./states.json";
import Joi from "joi";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import axios from "axios";
import logging from "../../redux/Actions/login";

import { useSelector, useDispatch } from "react-redux";
import registerHospital from "../../redux/Actions/registerHospital";

function BloodBankRegistration(props) {
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

  const [errors, setError] = useState({
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
      !/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
        data.name.trim()
      )
    ) {
      errors.name = " Username is either empty or invalid ";
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email.trim())) {
      errors.email = "Email is either empty or invalid";
    }
    if (
      !/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
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
      errors.password = "Enter a stronger password";
    }
    if (data.cPassword !== data.password || data.cPassword === "") {
      errors.cPassword = "Password is either empty or Passwords do not match";
    }
    if (!data.terms) {
      errors.terms = "Please accept our terms and conditions";
    }
    if (data.phone.length === 0) {
      errors.phone = "Phone number is empty somewhere";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    const errors = validate();
    console.log(errors);
    setError(errors);
    if (errors) return;
    console.log("axios call here");
  };

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
                  }}
                  key={idx}
                  inputProps={{
                    maxLength: 10,
                  }}
                  error={errors && errors.phone ? true : false}
                  helperText={errors && errors.phone ? errors.phone : null}
                />
              ))}
              <div>
                <ButtonGroup variant="text" color="default" align="center">
                  {data.phone.length < 5 ? (
                    <Button onClick={handleAdd}>Add a phone number</Button>
                  ) : null}
                  {data.phone.length === 1 ? null : (
                    <Button onClick={handleDelete}>Delete phone number</Button>
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

              <FormControl style={margin}>
                <InputLabel>
                  {errors && errors.state ? (
                    <p style={{ color: "#dc004e" }}>{errors.state}</p>
                  ) : (
                    <span>State</span>
                  )}
                </InputLabel>
                <Select
                  name="state"
                  onChange={handleChange}
                  value={data.state}
                  error={errors && errors.state ? true : false}
                >
                  {states.states.map((item, id) => (
                    <MenuItem value={item.state} key={id}>
                      {item.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl style={margin}>
                <InputLabel>
                  {errors && errors.district ? (
                    <p style={{ color: "#dc004e" }}>{errors.district}</p>
                  ) : (
                    <span>District</span>
                  )}
                </InputLabel>
                <Select
                  inputProps={{ readOnly: enable }}
                  name="district"
                  onChange={handleChange}
                  value={data.district}
                  error={errors && errors.district ? true : false}
                  helperText={
                    errors && errors.district ? errors.district : null
                  }
                >
                  {states.states[selectedStateIndex].districts.map(
                    (item, id) => (
                      <MenuItem value={item} key={id}>
                        {item}
                      </MenuItem>
                    )
                  )}
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
              <Link to="/terms" style={{ color: "grey", fontWeight: "bold" }}>
                Click here for terms and condition
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

export default BloodBankRegistration;
