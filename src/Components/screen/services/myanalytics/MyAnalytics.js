import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import { Navbar, Footer } from "../../../layouts";
import BarChart from "./barChart";
import LineChart from "./lineChart";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(1),
  },
  charts: {
    margin: theme.spacing(3),
  },
}));

function MyAnalytics() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Analytics</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view statistics about your data that is present with us
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.charts} spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Sales and Revenue stats:</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <BarChart title="MAY" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BarChart title="JUNE" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <BarChart title="JULY" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BarChart title="AUGUST" />
          </Grid>
        </Grid>

        <Grid container justify="center" className={classes.charts} spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Inventory stats :</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <LineChart title="BLOOD" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LineChart title="PLASMA" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LineChart title="PLATELETS" />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyAnalytics;
