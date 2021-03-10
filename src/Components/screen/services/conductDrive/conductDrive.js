import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  Divider,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { Navbar, Footer } from "../../../layouts";
import statesData from "../../../Auth/states.json";
import Joi from "joi";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "650px",
    display: "flex",
    flexDirection: "column",
  },
  papers: {
    width: "100%",

    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(4),
  },
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 250,
  },
  tableContainer: {
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(3),
  },
  tables: {
    padding: theme.spacing(3),
  },
}));

function ConductDrive() {
  const [data, setData] = useState({
    bloodGroups: [],
    address: "",
    state: "",
    district: "",
    pincode: "",
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    message: "",
  });

  const reqBody = {
    bloodGroups: [],
    address: "",
    state: "",
    district: "",
    pincode: "",
    startTimeStamp: "",
    endTimeStamp: "",
    message: "",
  };

  const regex = /^[0-9]*$/;

  const loggedInState = useSelector((state) => state.loggedIn);
  const [errors, setError] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

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
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const validate = () => {
    const errors = {};
    const currDate = new Date();

    if (data.address.trim() === "") {
      errors.address = "Address cannot be empty";
    }
    if (data.bloodGroups.length === 0) {
      errors.bloodGroups = "Blood Group cannot be empty";
    }
    if (data.state === "") {
      errors.state = "State cannot be empty";
    }
    if (data.district === "") {
      errors.district = "District cannot be empty";
    }
    if (data.pincode === "") {
      errors.pincode = "Pincode cannot be empty";
    }
    if (data.startTime === "") {
      errors.startTime = "Start Time cannot be empty";
    }
    if (data.endTime === "" || data.endTime < data.startTime) {
      errors.endTime = "End Time cannot be less than start time";
    }
    if (data.startDate === "" || new Date(data.startDate) < currDate) {
      errors.startDate = "Invalid Date";
    }
    if (
      data.endDate === "" ||
      new Date(data.endDate) < new Date(data.startDate)
    ) {
      errors.endDate = "End Date cannot be less than Start Date";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setError(errors);
    if (errors) return;

    reqBody.bloodGroups = data.bloodGroups;
    reqBody.address = data.address;
    reqBody.state = data.state;
    reqBody.district = data.district;
    reqBody.pincode = data.pincode;
    reqBody.startTimeStamp = data.startDate + "T" + data.startTime + ":00.00";
    reqBody.endTimeStamp = data.endDate + "T" + data.endTime + ":00.00";
    reqBody.message = data.message;

    axios
      .post("http://localhost:8080/conductadrive/savedrivedetails", reqBody, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        window.alert(
          "Drive has been initiated, check My Drives sections for more details"
        );
        history.push("/home");
        // }
      });
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          Conduct Blood Donation Drive
        </Typography>
        <Divider className={classes.heading} />
        <Typography variant="h6" className={classes.heading}>
          Here you can orgainze a Blood Donation drive and send notification to
          eligible donors. They will recive all the necessary details filled
          here for the drive. Fields with "*" are mandatory.
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.bloodGroups ? true : false}
                >
                  <InputLabel>Select required Blood Group</InputLabel>
                  <Select
                    multiple
                    label="Select required Blood Group"
                    name="bloodGroups"
                    onChange={handleChange}
                    value={data.bloodGroups}
                    error={errors && errors.bloodGroups ? true : false}
                    helperText={
                      errors && errors.bloodGroups ? errors.bloodGroups : null
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
                    {errors && errors.bloodGroups ? errors.bloodGroups : null}
                  </FormHelperText>
                </FormControl>

                <TextField
                  className={classes.formControl}
                  label="Enter your Address"
                  type="text"
                  name="address"
                  value={data.address}
                  variant="outlined"
                  onChange={handleChange}
                  error={errors && errors.address}
                  helperText={errors && errors.address ? errors.address : null}
                />
                <FormControl
                  variant="outlined"
                  style={{ marginTop: "20px" }}
                  error={errors && errors.state ? true : false}
                >
                  <InputLabel>Select required State</InputLabel>
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
                  style={{ marginTop: "20px" }}
                  error={errors && errors.district ? true : false}
                >
                  <InputLabel>Select required District</InputLabel>
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
                  style={{ marginTop: "20px" }}
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

                <InputLabel
                  style={{ marginTop: "20px" }}
                  error={errors && errors.startDate}
                >
                  Start Date
                </InputLabel>
                <TextField
                  type="date"
                  name="startDate"
                  value={data.startDate}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.startDate}
                  helperText={
                    errors && errors.startDate ? errors.startDate : null
                  }
                />

                <InputLabel
                  style={{ marginTop: "20px" }}
                  error={errors && errors.endDate}
                >
                  End Date
                </InputLabel>
                <TextField
                  type="date"
                  name="endDate"
                  value={data.endDate}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.endDate}
                  helperText={errors && errors.endDate ? errors.endDate : null}
                />

                <InputLabel
                  style={{ marginTop: "20px" }}
                  error={errors && errors.startTime}
                >
                  Start Time
                </InputLabel>
                <TextField
                  type="time"
                  name="startTime"
                  value={data.startTime}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.startTime}
                  helperText={
                    errors && errors.startTime ? errors.startTime : null
                  }
                />

                <InputLabel
                  style={{ marginTop: "20px" }}
                  error={errors && errors.endTime}
                >
                  End Time
                </InputLabel>
                <TextField
                  type="time"
                  name="endTime"
                  value={data.endTime}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.endTime}
                  helperText={errors && errors.endTime ? errors.endTime : null}
                />

                <TextField
                  className={classes.formControl}
                  label="Send a Message"
                  multiline
                  rows={7}
                  name="message"
                  value={data.message}
                  onChange={handleChange}
                  variant="outlined"
                  error={errors && errors.message}
                  helperText={errors && errors.message ? errors.message : null}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.formControl}
                  style={{ backgroundColor: "#E94364", color: "white" }}
                >
                  Send Notification
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClosed}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are You Sure, you want to logout?"}
                  </DialogTitle>
                  <DialogContent></DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosed} color="primary">
                      No
                    </Button>
                    <Button color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "110px" }} />
      <Footer />
    </>
  );
}

export default ConductDrive;
