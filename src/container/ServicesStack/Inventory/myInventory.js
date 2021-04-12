import React, { useState } from "react";
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
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";

import Table from "./table";

function MyInventory() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Inventory"
        subtitle="Here you can view, as well as update the stock availability of all
        your components."
      />

      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "200px" }} />
      <Footer />
    </>
  );
}

export default MyInventory;
