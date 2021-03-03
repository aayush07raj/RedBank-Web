import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  ButtonGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import hospital from "./images/hospital.jpg";
import states from "./states.json";
import Joi from "joi";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import axios from "axios";
import logging from "../../redux/Actions/login";

import { useSelector, useDispatch } from "react-redux";
import registerHospital from "../../redux/Actions/registerHospital";

const useStyles = makeStyles((theme) => ({
  Paper: {
    width: "auto",
    height: "200px",
    padding: theme.spacing(3),
  },
}));

function BloodBankRegistration(props) {
  const classes = useStyles();

  return (
    <>
      <LoggedOutNavbar />

      <Grid container style={{ backgroundColor: "red" }}>
        <Grid item xs={6}>
          <TextField variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
}

export default BloodBankRegistration;
