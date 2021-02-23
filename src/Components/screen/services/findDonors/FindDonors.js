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
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts";
import statesData from "../../../Auth/states.json";
import Table from "./useTable";
import Joi from "joi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
    bloodGroup: "",
    address: "",
  });

  const reqBody = {
    state: "",
    district: "",
    pincode: "",
    bloodGroup: "",
    address: "",
  };
  const loggedInState = useSelector((state) => state.loggedIn);
  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const [donorsList, setList] = useState([]);
  useEffect(() => {
    // console.log(donorsList);
  }, [donorsList]);

  const classes = useStyles();
  const regex = /^[0-9]*$/;

  // const schema = {
  //   state: Joi.required(),
  //   district: Joi.required(),
  //   pincode: Joi.required(),
  //   bloodGroup: Joi.required(),
  //   address: Joi.required(),
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        statesData.states.findIndex((item) => item.state === value)
      );
    }

    // const allErrors = { ...errors };
    // const errorMsg = validateProperty(e.target);
    // if (errorMsg) {
    //   allErrors[name] = errorMsg;
    // } else {
    //   delete allErrors[name];
    // }
    const updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
    // setErrors(allErrors);
  };

  // const validateProperty = ({ name, value }) => {
  //   const inputField = { [name]: value };
  //   const fieldSchema = Joi.object({ [name]: schema[name] });
  //   const { error } = fieldSchema.validate(inputField);
  //   return error ? error.details[0].address : null;
  // };

  // const validate = () => {
  //   const formSchema = Joi.object(schema);
  //   const { error } = formSchema.validate(data, {
  //     abortEarly: false,
  //   });

  //   if (!error) return null;

  //   const allErrors = {};
  //   for (let err of error.details) {
  //     allErrors[err.path[0]] = err.address;
  //   }
  //   return allErrors;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const errors = validate();
    // setErrors({ errors: errors || {} });
    // if (errors) return;

    reqBody.state = data.state;
    reqBody.district = data.district;
    reqBody.pincode = data.pincode;
    reqBody.bloodGroup = data.bloodGroup;
    reqBody.address = data.address;

    axios
      .post("http://localhost:8080/finddonors/donorslist", reqBody, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        setList(response.data);
        // console.log(response);
        // }
      })
      .catch();
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4">Find Donor</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can search any inidividual for blood donation. Fill the
          parameters and click on search.
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required State</InputLabel>
                  <Select
                    required
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    label="Select required State"
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
                  <InputLabel>Select required District</InputLabel>
                  <Select
                    required
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                    label="Select required District"
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

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required Blood Group</InputLabel>
                  <Select
                    required
                    label="Select required Blood Groups *"
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
                </FormControl>

                <TextField
                  className={classes.formControl}
                  label="Add the venue for the invitation"
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
                  // disabled={validate() ? true : false}
                >
                  Search
                </Button>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            {donorsList.length === 0 ? (
              <h3 align="center">Results will be displayed here</h3>
            ) : (
              <Table list={donorsList} formData={data} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FindDonors;
