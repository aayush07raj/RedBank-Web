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
import empty from "../../../assets/images/empty.png";

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
            {sale.length > 0 ? (
              <>
                <Table list={sale} />
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
                    Not yet.
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

export default MySales;
