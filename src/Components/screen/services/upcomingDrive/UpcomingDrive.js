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
import Table from "./useTable";
import Joi from "joi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "550px",
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

function UpcomingDrive() {
  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();

  const schema = {
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number()
      .positive()
      .min(6)
      .message("Pincode must contain 6 digits")
      .required(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const forAxios = () => {
    axios.post('http://localhost:5000/finddrives',{
      pincode:data.pincode
    })
    .then(function (response) {
      console.log("working")
      console.log(response)
    })
  }


  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <h2 style={{ marginTop: "10px" }} align="center">
                  Upcoming Drives
                </h2>

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
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  error={errors && errors.pincode ? true : false}
                  helperText={errors && errors.pincode ? errors.pincode : null}
                />
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.formControl}
                  onClick={forAxios}
                >
                  Search
                </Button>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UpcomingDrive;