import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import statesData from "../../../assets/json/statesWithAll.json";
import Table from "./useTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";
import api from "../../../Apis/api";

function FindDonors() {
  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
    bloodGroup: "",
    address: "",
  });

  const reqBody = {};
  const loggedInState = useSelector((state) => state.loggedIn);
  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [donorsList, setList] = useState([]);
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

  // submission and validation
  const validate = () => {
    const errors = {};

    if (data.address.trim() === "") {
      errors.address = "Address cannot be empty";
    }
    if (data.bloodGroup === "") {
      errors.bloodGroup = "Blood Group cannot be empty";
    }
    if (data.state === "") {
      errors.state = "State cannot be empty";
    }
    if (data.district === "") {
      errors.district = "District cannot be empty";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const validateField = (fieldName, fieldValue) => {
    var error = "";

    if (fieldName === "address" && fieldValue.trim() === "") {
      error = "Address cannot be empty";
    } else if (fieldName === "bloodGroup" && fieldValue === "") {
      error = "Blood Group cannot be empty";
    } else if (fieldName === "state" && fieldValue === "") {
      error = "State cannot be empty";
    } else if (fieldName === "district" && fieldValue === "") {
      error = "District cannot be empty";
    }

    return error === "" ? null : error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) return;

    reqBody.state = data.state;
    reqBody.district = data.district;
    reqBody.pincode = data.pincode;
    reqBody.bloodGroup = data.bloodGroup;
    reqBody.address = data.address;

    api
      .post()
      .findDonors(reqBody, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        if (response.data.length != 0) {
          setList(response.data);
        } else {
          handleClickOpen();
        }
      })
      .catch();
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
        title="Find Donor "
        subtitle="Here you can search any inidividual for blood donation. Fill the
        parameters and click on search."
      />

      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper xs={12} md={12} className={classes.paper} elevation={5}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.state ? true : false}
                >
                  <InputLabel>Select required State*</InputLabel>
                  <Select
                    label="Select required State"
                    name="state"
                    onChange={handleChange}
                    value={data.state}
                  >
                    {statesData.states.map((item, id) => (
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
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.district ? true : false}
                >
                  <InputLabel>Select required District*</InputLabel>
                  <Select
                    label="Select required District"
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                  >
                    {statesData.states[selectedStateIndex].districts.map(
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
                  className={classes.formControl}
                  label="Enter required Pincode"
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
                  error={errors && errors.bloodGroup ? true : false}
                >
                  <InputLabel>Select required Blood Group*</InputLabel>
                  <Select
                    label="Select required Blood Group"
                    name="bloodGroup"
                    onChange={handleChange}
                    value={data.bloodGroup}
                    error={errors && errors.bloodGroup ? true : false}
                    helperText={
                      errors && errors.bloodGroup ? errors.bloodGroup : null
                    }
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
                  className={classes.formControl}
                  label="Add the venue for the invitation*"
                  multiline
                  rows={7}
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                  variant="outlined"
                  error={errors && errors.address}
                  helperText={errors && errors.address ? errors.address : null}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.formControl}
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
                  No active donors found in the selected location
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
            {donorsList.length !== 0 ? (
              <Table list={donorsList} formData={data} />
            ) : null}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FindDonors;
