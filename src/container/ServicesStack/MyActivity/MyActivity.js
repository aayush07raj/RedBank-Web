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
import empty from "../../../assets/images/empty.png";

import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../serviceCSS";
import Table from "./table";
import PageHeader from "../../../component/pageHeader";
import api from "../../../Apis/api";

function MyCommitments() {
  const classes = useStyles();
  const [commitmentsList, setList] = useState([]);
  const loggedInState = useSelector((state) => state.loggedIn);
  useEffect(() => {
    api
      .get()
      .fetchCommitments({
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        // if (response.data.success) {
        setList(response.data);
        // }
      })
      .catch();
  }, [loggedInState]);

  return (
    <>
      <Navbar />
      <PageHeader
        title=" My Activity"
        subtitle="Here you can view all the types of donations you have done since
        your registration."
      />
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.tables}>
          <Grid item xs={12}>
            {commitmentsList.length > 0 ? (
              <>
                <Table list={commitmentsList} />
                <Container style={{ height: "250px" }}></Container>
              </>
            ) : (
              <Grid container justify="center">
                <Grid item>
                  <img src={empty} className={classes.imageBreakpoint} />
                  <Typography
                    align="center"
                    variant="h4"
                    className={classes.headingTop}
                  >
                    Not yet, Donate to someone!
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyCommitments;
