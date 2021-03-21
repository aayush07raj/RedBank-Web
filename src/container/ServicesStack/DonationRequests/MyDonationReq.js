import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import axios from "axios";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";

import Table from "./useTable";

function MyDonationReq() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Donation Request "
        subtitle="Here you can view all your sent request for donors."
      />
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
