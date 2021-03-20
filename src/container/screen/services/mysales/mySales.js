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

function MySales() {
  const classes = useStyles();
  const [sale, setList] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  useEffect(() => {
    axios
      .get("http://localhost:8080/transactions/fetchsaleslist", {
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
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          My Sales-
          <Typography variant="h6" className={classes.inline}>
            Here you can view all the sale you have done and details about it
          </Typography>
        </Typography>
      </Paper>
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={sale} />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "220px" }}></Container>
      <Footer />
    </>
  );
}

export default MySales;
