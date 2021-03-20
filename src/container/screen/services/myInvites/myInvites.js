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
import { useSelector } from "react-redux";

import { useStyles } from "../serviceCSS";

import Table from "./table";

function MyInvites() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          My Invites-{" "}
          <Typography variant="h6" className={classes.inline}>
            Here you can view all incoming invitation to you for donation drives
            and individual requests
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
      <Container style={{ height: "220px" }}></Container>
      <Footer />
    </>
  );
}

export default MyInvites;
