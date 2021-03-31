import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import { useSelector } from "react-redux";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";
import api from "../../../Apis/api";
import Table from "./table";
import empty from "../../../assets/images/empty.png";

function MyPurchase() {
  const [purchase, setList] = useState([]);

  const loggedInState = useSelector((state) => state.loggedIn);

  useEffect(() => {
    api
      .get()
      .fetchPurchases({
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
  }, [loggedInState]);

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
          <Grid item sm={12}>
            {purchase.length > 0 ? (
              <Table list={purchase} />
            ) : (
              <Grid container justify="center">
                <Grid item>
                  <img
                    src={empty}
                    height="600px"
                    width="600px"
                    className={classes.imageBreakpoint}
                  />
                  <Typography
                    align="center"
                    variant="h4"
                    className={classes.headingTop}
                  >
                    Sorry, no data found
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

export default MyPurchase;
