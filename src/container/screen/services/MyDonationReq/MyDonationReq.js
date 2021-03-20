import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import Navbar from "../../../../component/navbar";
import Footer from "../../../../component/footer";
import axios from "axios";
import { useStyles } from "../serviceCSS";

import Table from "./useTable";

function MyDonationReq() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          My Donation Request-{" "}
          <Typography variant="h6" className={classes.inline}>
            Here you can view all your sent request for donors
          </Typography>
        </Typography>
      </Paper>
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "270px" }}></Container>
      <Footer />
    </>
  );
}

export default MyDonationReq;
