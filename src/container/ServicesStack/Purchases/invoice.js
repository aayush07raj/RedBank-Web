import React from "react";
import Navbar from "../../../component/navbar";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Footer from "../../../component/footer";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";

const Invoice = (props) => {
  const { Details } = props.location;
  console.log(Details);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <PageHeader
        title="Invoice "
        subtitle="Show this to the concerned blood bank while asking for your booked
        blood"
      />
      <Container maxWidth="lg">
        <Grid
          container
          alignContent="center"
          justify="center"
          className={classes.table2}
        >
          <Paper align="center" square style={{ marginBottom:"20px", padding: "20px" }}>
            <Typography className={classes.typo} variant="h4">
              Invoice
            </Typography>
            <Divider />
            <Container className={classes.typo}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Date of Transaction :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.dateOfTransaction.split("T")[0]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Invoice no :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.purchaseId}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Component purchased :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.soldComponent}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Blood group purchased :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.soldGroup}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Quantity purchased :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.soldQuantity}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Reason for purchase :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.reason}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Location of usage :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.location}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Seller Name :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.sellerName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Seller contact details :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.sellerContact}, {Details.sellerEmail}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Total amount to be paid :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    {Details.pricePerUnit * Details.soldQuantity}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Invoice;
