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
import Navbar from "../../../../component/navbar";
import Footer from "../../../../component/footer";
import PageHeader from "../../../../component/pageHeader";

import Table from "./table";
import { useStyles } from "../serviceCSS";

function MyBloodDonationDrives() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Blood Donation Drives"
        subtitle="A section showing details of all the drives you have conducted, or
        which are yet to happen in the near future."
      />
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "250px" }} />
      <Footer />
    </>
  );
}

export default MyBloodDonationDrives;
