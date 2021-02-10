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
    margin: theme.spacing(3),
  },
}));

function MyInvites() {
  const classes = useStyles();
  const [invitesList, setList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/invites")
      .then((response) => {
        if (response.data.success) {
          setList(response.data.invitesList);
        }
      })
      .catch();
  }, []);

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Invites</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view all incoming invitation to you for donation drives and individua requests
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={invitesList} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyInvites;