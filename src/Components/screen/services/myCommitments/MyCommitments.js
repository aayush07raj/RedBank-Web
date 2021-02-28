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
import { useDispatch, useSelector } from "react-redux";

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

function MyCommitments() {
  const classes = useStyles();
  const [commitmentsList, setList] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  useEffect(() => {
    axios
      .get("http://localhost:8080/commitment", {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        console.log(response);
        setList(response.data);
        // }
      })
      .catch();
  }, []);

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Commitments</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view all the types of donations you have done since your
          registration
        </Typography>
      </Paper>
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={commitmentsList} />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height:"200px" }}></Container>
      <Footer  />
    </>
  );
}

export default MyCommitments;
