import React, { useState } from "react";
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
import {useStyles} from "../serviceCSS";

import Table from "./table";


function MyInventory() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          My Inventory- <Typography variant="h6" className={classes.inline}>
          Here you can view, as well as update the stock availability of all
          your components
        </Typography>
        </Typography>
        
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "200px" }}/>
      <Footer />
    </>
  );
}

export default MyInventory;
