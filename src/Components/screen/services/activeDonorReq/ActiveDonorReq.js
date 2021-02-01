import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts";
import axios from "axios";

import Table from "./useTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",

    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(4),
  },
  table: {
    margin: theme.spacing(3),
  },
}));

function FindDonors() {
  const classes = useStyles();
  const [active , setList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/donorlist")
      .then((response) => {
        if (response.data.success) {
          setList(response.data.list);
        }
      })
      .catch();
  }, []);

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">Active Donor Request</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view all your sent request for donors
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={active} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FindDonors;
