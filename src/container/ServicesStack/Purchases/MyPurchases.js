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
import { useSelector } from "react-redux";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";

import Table from "./table";

function MyPurchase() {
  const [purchase, setList] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  useEffect(() => {
    axios
      .get("http://localhost:8080/transactions/fetchpurchaseslist", {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {

        setList(response.data);
        // }
      })
      .catch();
  }, []);

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Purchases "
        subtitle="Here you can view all the purchases you have done since your
        registration."
      />

      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={purchase} />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "300px" }}></Container>
      <Footer />
    </>
  );
}

export default MyPurchase;