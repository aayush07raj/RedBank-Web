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
    margin: theme.spacing(3),
  },
}));

function MyInventory() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          My Inventory
        </Typography>
        <Divider className={classes.heading} />
        <Typography variant="h6" className={classes.heading}>
          Here you can view, as well as update the stock availability of all
          your components
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

export default MyInventory;
