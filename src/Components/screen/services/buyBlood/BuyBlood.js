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
  Divider,
  Typography,
  Button,
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts/";
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

function FindDonors() {
  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
    bg: [],
    component: [],
    units: "",
  });

  const [list, setList] = useState([]);

  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();
  const regex = /^[0-9]*$/;

  const schema = {
    state: Joi.required(),
    district: Joi.required(),
    pincode: Joi.required(),
    bg: Joi.required(),
    component: Joi.string().required(),
    units: Joi.number().required(),
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

  const forAxios = (e) => {
    e.preventDefault();
    const errors = validate();

    setErrors({ errors: errors || {} });
    if (errors) return;

    axios
      .get("http://localhost:5000/buybloodlist")
      .then((response) => {
        if (response.data.success) {
          setList(response.data.list);
        }
      })
      .catch();
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4">Buy Blood</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can search nearest blood bank and buy items as per your
          requirement. Fill the parameters and click on search.
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required Blood Group *</InputLabel>
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
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
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

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.formControl}
                  disabled={validate() ? true : false}
                  onClick={forAxios}
                >
                  Search
                </Button>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            {list.length === 0 ? (
              <h3 align="center">Results will be displayed here</h3>
            ) : (
              <Table
                list={list}
                bg={data.bg}
                component={data.component}
                units={data.units}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FindDonors;
