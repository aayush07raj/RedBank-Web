import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts";

import Table from "./table";

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

function MyDrives() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Blood Donation Drives</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view all the blood donation drives you have orgainzed done since your
          registration
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyDrives;
