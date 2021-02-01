import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts";
import statesData from "../../../Auth/states.json";
import Joi from "joi";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "650px",
    display: "flex",
    flexDirection: "column",
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

  const schema = {
    bg: Joi.required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number()
      .positive()
      .min(6)
      .message("Pincode must contain 6 digits")
      .required(),
    startTime: Joi.string().required(),
    startDate: Joi.string().required(),
    endTime: Joi.string().required(),
    endDate: Joi.string().required(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    setErrors({ errors: errors || {} });
    if (errors) return;

    window.alert("Notification sent");

    console.log(data);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <h2 style={{ marginTop: "10px" }} align="center">
                  Conduct Drive
                </h2>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required Blood Groups</InputLabel>
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
                  label="Enter your Address"
                  type="text"
                  name="address"
                  value={data.address}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.address}
                  helperText={errors && errors.address ? errors.address : null}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select your State</InputLabel>
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
                  <InputLabel>Select your District</InputLabel>
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
                  label="Enter your Pincode"
                  type="text"
                  name="pincode"
                  value={data.pincode}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.pincode}
                  helperText={errors && errors.pincode ? errors.pincode : null}
                />

                <TextField
                  className={classes.formControl}
                  label="Start Time:"
                  type="text"
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
                <TextField
                  className={classes.formControl}
                  label="End Time:"
                  type="text"
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
                  label="Start Date:"
                  type="text"
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
                <TextField
                  className={classes.formControl}
                  label="End Date:"
                  type="text"
                  name="endDate"
                  value={data.endDate}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.endDate}
                  helperText={errors && errors.endDate ? errors.endDate : null}
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
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            {/* <Table /> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ConductDrive;