import React from "react";
import { Container, Grid } from "@material-ui/core";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import PageHeader from "../../../component/pageHeader";
import Table from "./table";
import { useStyles } from "../../ServicesStack/serviceCSS";

function MyBloodDonationDrives() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Blood Donation Drives"
        subtitle="A section showing details of all the drives you have conducted, or
        which are yet to happen in the near future."
      />
      <Container maxWidth="xl">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyBloodDonationDrives;
