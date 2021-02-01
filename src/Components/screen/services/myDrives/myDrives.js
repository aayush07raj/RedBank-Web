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
  const [drivesList, setList] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/finddrives", {
        pincode: "111112",
      })
      .then((response) => {
        if (response.data.success) {
          setList(response.data.upcomingDrivesList);
          //   console.log(drivesList);
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Blood Donation Drives</Typography>
        <Divider />
        <Typography variant="h6">
          A section showing details of all the drives you have conducted, or
          which are yet to happen in the near future.
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={drivesList} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyBloodDonationDrives;