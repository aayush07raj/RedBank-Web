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

import Table from "./table";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    width: "100%",

    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(4),
  },
  table: {
    marginTop: theme.spacing(7),
  },
}));

function MyBloodDonationDrives() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          My Blood Donation Drives
        </Typography>
        <Divider className={classes.heading} />
        <Typography variant="h6" className={classes.heading}>
          A section showing details of all the drives you have conducted, or
          which are yet to happen in the near future.
        </Typography>
      </Paper>
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "90px" }}></Container>
      <Footer />
    </>
  );
}

export default MyBloodDonationDrives;
