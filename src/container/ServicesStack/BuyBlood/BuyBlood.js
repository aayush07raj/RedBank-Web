import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  TextField,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import statesData from "../../../assets/json/statesWithAll.json";
import Table from "./useTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../serviceCSS";
import PageHeader from "../../../component/pageHeader";
import api from "../../../Apis/api";

function BuyBlood() {
  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
    bg: "",
    component: "",
    units: "",
    reason: "",
    location: "",
  });

  const [list, setList] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();
  const regex = /^[0-9]*$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        statesData.states.findIndex((item) => item.state === value)
      );
    }

    const updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);

    const error = validateField(name, value);
    const updatedErrors = { ...errors };
    updatedErrors[name] = error;
    setErrors(updatedErrors);
  };

  const validate = () => {
    const errors = {};

    if (data.bg.trim() === "") {
      errors.bg = "Bloood Group cannot be empty";
    }
    if (data.component.trim() === "") {
      errors.component = "Component cannot be empty";
    }
    if (data.units.trim() === "") {
      errors.units = "Units cannot be empty";
    }
    if (data.component.trim() === "") {
      errors.component = "Component cannot be empty";
    }
    if (data.reason.trim() === "") {
      errors.reason = "Reason cannot be empty";
    }
    if (data.location.trim() === "" && loggedInState.userType === 1) {
      errors.location = "Location cannot be empty";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };
  const validateField = (fieldName, fieldValue) => {
    var error = "";

    if (fieldName === "bg" && fieldValue.trim() === "") {
      error = "Bloood Group cannot be empty";
    }
    if (fieldName === "component" && fieldValue.trim() === "") {
      error = "Component cannot be empty";
    }
    if (fieldName === "units" && fieldValue.trim() === "") {
      error = "Units cannot be empty";
    }
    if (fieldName === "component" && fieldValue.trim() === "") {
      error = "Component cannot be empty";
    }
    if (fieldName === "reason" && fieldValue === "") {
      error = "Reason cannot be empty";
    }
    if (
      fieldName === "location" &&
      fieldValue.trim() === "" &&
      loggedInState.userType === 1
    ) {
      error = "Location cannot be empty";
    }
    return error === "" ? null : error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);
    if (errors) return;

    console.log("handle submit");
    api
      .post()
      .findBloodBanks(
        {
          bloodGroup: data.bg,
          component: data.component,
          reqUnits: data.units,
          state: data.state,
          district: data.district,
          pincode: data.pincode,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.length != 0) {
          setList(response.data);
        } else {
          setList([]);
          handleClickOpen();
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  // state for no results dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <PageHeader
        title="Buy Blood "
        subtitle="Here you can search nearest blood bank and buy items as per your
        requirement. Fill the parameters and click on search."
      />

      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form>
              <Paper xs={12} md={12} className={classes.paper} elevation={5}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.bg ? true : false}
                >
                  <InputLabel>Select required Blood Group*</InputLabel>
                  <Select
                    label="Select required Blood Group"
                    name="bg"
                    onChange={handleChange}
                    value={data.bg}
                    error={errors && errors.bg ? true : false}
                    helperText={errors && errors.bg ? errors.bg : null}
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
                    {errors && errors.bg ? errors.bg : null}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.component ? true : false}
                >
                  <InputLabel>Select Component *</InputLabel>
                  <Select
                    label="Select Component"
                    name="component"
                    onChange={handleChange}
                    value={data.component}
                    error={errors && errors.component ? true : false}
                    helperText={
                      errors && errors.component ? errors.component : null
                    }
                  >
                    <MenuItem value={"Blood"}>Blood</MenuItem>
                    <MenuItem value={"Plasma"}>Plasma</MenuItem>
                    <MenuItem value={"Platelets"}>Platelets</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors && errors.component ? errors.component : null}
                  </FormHelperText>
                </FormControl>

                <TextField
                  className={classes.formControl}
                  label="Required Units *"
                  type="text"
                  name="units"
                  value={data.units}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 4 }}
                  error={errors && errors.units ? true : false}
                  helperText={errors && errors.units ? errors.units : null}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select your State</InputLabel>
                  <Select
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    label="Select your State"
                    error={errors && errors.state ? true : false}
                    helperText={errors && errors.state ? errors.state : null}
                  >
                    {statesData.states.map((item, id) => (
                      <MenuItem key={id} value={item.state}>
                        {item.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select your District</InputLabel>
                  <Select
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                    label="Select your District"
                    error={errors && errors.district ? true : false}
                    helperText={
                      errors && errors.district ? errors.district : null
                    }
                  >
                    {statesData.states[selectedStateIndex].districts.map(
                      (item, id) => (
                        <MenuItem key={id} value={item}>
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

                <TextField
                  className={classes.formControl}
                  label="Enter your Pincode"
                  type="text"
                  name="pincode"
                  value={data.pincode}
                  variant="outlined"
                  onChange={(e) => {
                    if (regex.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.pincode ? true : false}
                  helperText={errors && errors.pincode ? errors.pincode : null}
                />

                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.reason ? true : false}
                >
                  <InputLabel>Select reason for purchase*</InputLabel>
                  <Select
                    label="Select reason for purchase*"
                    name="reason"
                    onChange={handleChange}
                    value={data.reason}
                    error={errors && errors.reason ? true : false}
                    helperText={errors && errors.reason ? errors.reason : null}
                  >
                    <MenuItem value={"Surgery"}>Surgery</MenuItem>
                    <MenuItem value={"Accident"}>Accident</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors && errors.reason ? errors.reason : null}
                  </FormHelperText>
                </FormControl>

                {loggedInState.userType === 1 ? (
                  <TextField
                    className={classes.formControl}
                    label="Clinic/Hospital *"
                    type="text"
                    name="location"
                    value={data.location}
                    variant="outlined"
                    onChange={handleChange}
                    error={errors && errors.location ? true : false}
                    helperText={
                      errors && errors.location ? errors.location : null
                    }
                  />
                ) : null}

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.formControl}
                  onClick={(e) => handleSubmit(e)}
                  style={{ backgroundColor: "#E94364", color: "white" }}
                >
                  Search
                </Button>
              </Paper>
            </form>
            {/* dialog for results */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{"No results found"}</DialogTitle>
              <DialogContent dividers>
                <DialogContentText>
                  Either there are no blood banks found in the selected
                  location, or they dont meet your requirements.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} className={classes.confirmBtn}>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid item xs={12} className={classes.tableContainer}>
            {list.length !== 0 ? (
              <Table
                list={list}
                bg={data.bg}
                component={data.component}
                units={data.units}
                location={data.location || "N/A"}
                reason={data.reason}
              />
            ) : null}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default BuyBlood;
