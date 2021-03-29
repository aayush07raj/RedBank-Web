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
import { useStyles } from "../../ServicesStack/serviceCSS";
import Table from "./table";
import PageHeader from "../../../component/pageHeader";
import api from "../../../Apis/api";

function MySales() {
  const classes = useStyles();
  const [sale, setList] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  useEffect(() => {
    api
      .get()
      .fetchSales({
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        console.log(response);
        setList(response.data);
        // }
      });
  }, [loggedInState]);

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Sales "
        subtitle="Here you can view all the sale you have done and details about it."
      />
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table list={sale} />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "280px" }}></Container>
      <Footer />
    </>
  );
}

export default MySales;
