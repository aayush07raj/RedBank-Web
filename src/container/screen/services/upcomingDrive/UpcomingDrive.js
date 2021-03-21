import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import Navbar from "../../../../component/navbar";
import Footer from "../../../../component/footer";
import statesData from "../../../../assets/json/statesWithAll.json";
import Table from "./useTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { useStyles } from "../serviceCSS";
import PageHeader from "../../../../component/pageHeader";

function UpcomingDrive() {
  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
  });

  const regex = /^[0-9]*$/;
  const [driveList, setState] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  const [errors, setErrors] = useState({});
  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();

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

  const validate = () => {
    const errors = {};

    if (data.state === "") {
      errors.state = "State cannot be empty";
    }
    if (data.district === "") {
      errors.district = "District cannot be empty";
    }
    if (!regex.test(data.pincode)) {
      errors.pincode = "Invalid pincode format";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    setErrors(errors);
    if (errors) return;

    if (loggedInState.donorStatus !== 2) {
      axios
        .post("http://localhost:8080/upcomingdrives/fetchdriveslist", data, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          if (response.data.length != 0) {
            setState(response.data);
          } else {
            handleClickOpen();
          }
        })
        .catch();
    } else {
      handleClickOpen();
    }
  };

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
        title="Find Upcoming Drives "
        subtitle="Here you can search upcoming blood donation drives. Fill the
        parameters and click on search."
      />
      
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors && errors.state ? true : false}
                >
                  <InputLabel>Select your State</InputLabel>
                  <Select
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    label="Select your State"
                  >
                    {statesData.states.map((item, id) => (
                      <MenuItem key={id} value={item.state}>
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
                  <InputLabel>Select your District</InputLabel>
                  <Select
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                    label="Select your District"
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
                  style={{ backgroundColor: "#E94364", color: "white" }}
                >
                  Search
                </Button>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            {driveList.length !== 0 ? <Table list={driveList} /> : null}
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"No results found"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {loggedInState.donorStatus === 2 ? (
                  <>You are not eligible to register for a drive</>
                ) : (
                  <>There are no upcoming drive in the selected location</>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UpcomingDrive;
