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
import { useDispatch, useSelector } from "react-redux";
import {useStyles} from "../serviceCSS";

import Table from "./table";

// const useStyles = makeStyles((theme) => ({
//   heading: {
//     marginBottom: theme.spacing(2),
//   },
//   paper: {
//     width: "100%",

//     flexDirection: "column",
//     margin: "auto",
//     padding: theme.spacing(4),
//   },
//   table: {
//     margin: theme.spacing(3),
//   },
// }));

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
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4" className={classes.heading}>
          My Commitments- <Typography variant="h6" className={classes.inline}>
          Here you can view all the types of donations you have done since your
          registration
        </Typography>
        </Typography>
       
        
      </Paper>
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.tables}>
          <Grid item xs={12}>
            <Table list={commitmentsList} />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "250px" }}></Container>
      <Footer />
    </>
  );
}

export default MyCommitments;
