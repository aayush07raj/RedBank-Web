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

const useStyles = makeStyles((theme) => ({
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
    bg: [],
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
  const loggedInState = useSelector((state) => state.loggedIn);

  const schema = {
    bg: Joi.array().items(Joi.string()).required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number()
      .positive()
      .min(6)
      .message("Pincode must contain 6 digits")
      .required(),
    startTime: Joi.string().required(),
    startDate: Joi.date().greater("now").message("Invalid date").required(),
    endTime: Joi.string().required(),
    endDate: Joi.date().greater("now").message("Invalid date").required(),
    message: Joi.required(),
  };

  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();

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
        statesData.states.findIndex((item) => item.state === value)
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    reqBody.bloodGroups = data.bg;
    reqBody.address = data.address;
    reqBody.state = data.state;
    reqBody.district = data.district;
    reqBody.pincode = data.pincode;
    reqBody.startTimeStamp = data.startDate + "T" + data.startTime + ":00.00";
    reqBody.endTimeStamp = data.endDate + "T" + data.endTime + ":00.00";
    reqBody.message = data.message;

    console.log(reqBody);

    setErrors({ errors: errors || {} });
    if (errors) return;

    console.log("Bearer" + " " + loggedInState.userToken);

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
        // }
      });
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4">Conduct Blood Donation Drive</Typography>
        <Divider />
        <Typography variant="h6">
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required Blood Groups *</InputLabel>
                  <Select
                    required
                    multiple
                    label="Select required Blood Groups"
                    name="bg"
                    onChange={handleChange}
                    value={data.bg}
                    error={errors && errors.bg}
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
                </FormControl>
                <TextField
                  className={classes.formControl}
                  label="Enter your Address *"
                  type="text"
                  name="address"
                  value={data.address}
                  variant="outlined"
                  onChange={handleChange}
                  error={errors && errors.address}
                  helperText={errors && errors.address ? errors.address : null}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select your State *</InputLabel>
                  <Select
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    label="Select your State"
                    error={errors && errors.state}
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
                  <InputLabel>Select your District *</InputLabel>
                  <Select
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                    label="Select your District"
                    error={errors && errors.district}
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
                  label="Enter your Pincode *"
                  type="text"
                  name="pincode"
                  value={data.pincode}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.pincode}
                  helperText={errors && errors.pincode ? errors.pincode : null}
                />

                <InputLabel style={{ marginTop: "20px" }}>
                  Start Date *
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

                <InputLabel style={{ marginTop: "20px" }}>
                  End Date *
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

                <InputLabel style={{ marginTop: "20px" }}>
                  Start Time *
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

                <InputLabel style={{ marginTop: "20px" }}>
                  End Time *
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
                  disabled={validate()}
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
      <Footer />
    </>
  );
}

export default ConductDrive;
