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
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import { useSelector } from "react-redux";
import PageHeader from "../../../component/pageHeader";
import { useStyles } from "../../ServicesStack/serviceCSS";

import Table from "./table";

function MyInvites() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Invites "
        subtitle="Here you can view all incoming invitation to you for donation drives
        and individual requests."
      />

      <Container maxWidth="xl">
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

export default MyInvites;
