import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Typography,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts";
import statesData from "../../../Auth/states.json";
import Table from "./useTable";
import Joi from "joi";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "550px",
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

function UpcomingDrive() {
  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
  });

  const [driveList, setState] = useState([]);

  const loggedInState = useSelector((state) => state.loggedIn);
  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();

  const schema = {
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.required(),
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

    axios
      .post("http://localhost:8080/upcomingdrives/fetchdriveslist", data, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then(function (response) {
        console.log(response);
        setState(response.data);
      });
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          Find Upcoming Drives
        </Typography>
        <Divider className={classes.heading} />
        <Typography variant="h6" className={classes.heading}>
          Here you can search upcoming blood donation drives. Fill the
          parameters and click on search.
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
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
                  disabled={validate()}
                >
                  Search
                </Button>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            {driveList.length === 0 ? (
              <h3 align="center">Results will be displayed here</h3>
            ) : (
              <Table list={driveList} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UpcomingDrive;
