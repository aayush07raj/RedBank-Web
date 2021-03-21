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
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../../ServicesStack/serviceCSS";
import Table from "./table";
import PageHeader from "../../../component/pageHeader";

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
        setList(response.data);
        // }
      })
      .catch();
  }, []);

  return (
    <>
      <Navbar />
      <PageHeader
        title=" My Commitments "
        subtitle="Here you can view all the types of donations you have done since
        your registration."
      />
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.tables}>
          <Grid item xs={12}>
            <Table list={commitmentsList} />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "300px" }}></Container>
      <Footer />
    </>
  );
}

export default MyCommitments;
