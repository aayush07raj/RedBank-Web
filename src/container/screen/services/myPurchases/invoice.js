import React from "react";
import Navbar from "../../../../component/navbar";
import {
    Container,
    Grid,
    makeStyles,
    Paper,
    Typography,
    Button,
    Divider,
  } from "@material-ui/core";
import Footer from "../../../../component/footer";

const useStyles = makeStyles((theme) => ({
    paper: {
      // position:'fixed',
      width: "100%",
  
      flexDirection: "column",
      margin: "auto",
      padding: theme.spacing(2),
    },
    typo: {
      fontWeight: "bold",
      padding: "10px",
    },
    table: {
      margin: theme.spacing(10),
      width: "80%",
    },
  }));

const Invoice =(props)=>{
    const { soldComponent, soldGroup, soldQuantity, sellerName, sellerContact, sellerEmail} = props.location;
    const classes = useStyles();
    return (
        <>
        <Navbar/>
        <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">Invoice</Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid
          container
          alignContent="center"
          justify="center"
          className={classes.table}
        >
            <Paper align="center" square style={{ padding: "20px" }}>
            <Typography className={classes.typo} variant="h4">Invoice</Typography>
              <Divider/>
              <Container className={classes.typo}>
                <Grid container>
                
                  <Grid align="center" item md={12}>
                  <Typography className={classes.typo} variant="h6">
                  Component Type : {soldComponent}
                </Typography>
                  <Typography className={classes.typo} variant="h6">
                  Blood Group : {soldGroup}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Quantity :{soldQuantity}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Seller :{sellerName}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Seller Contact :{sellerContact}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Seller Email :{sellerEmail}
                </Typography>
                  </Grid>
                </Grid>
                
              </Container>

            </Paper>
        </Grid>
        </Container>
        <Footer/>
        </>
    )
}

export default Invoice;