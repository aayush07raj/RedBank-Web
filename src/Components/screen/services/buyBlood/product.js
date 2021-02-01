import React from 'react';
import { Navbar, Footer } from "../../../layouts/";
import {
    Container,
    Grid,
    makeStyles,
    Paper,
    Typography,
    Button,
    Divider,
  } from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    paper: {
      // position:'fixed',
      width: "100%",
  
      flexDirection: "column",
      margin: "auto",
      padding: theme.spacing(4),
    },
    typo:{
      fontWeight: "bold",
      padding:"10px",
    },
    table: {
      margin: theme.spacing(10),
      width: "80%"
    },
  }));

  const handleClick=()=>{
    console.log("Working")
  }

  

function Product() {
    const classes = useStyles();
    return(
    <>
    <Navbar />
    <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">Selected Product</Typography>
        <Divider />
        <Typography variant="h6" style={{}}>
          Details about the selected product, press Buy button to confirm your order
        </Typography>
    </Paper>
      <Container maxWidth="lg">
        <Grid container alignContent="center" justify="center" className={classes.table}>
          <Grid item xs={12} style={{ }}>
            <Paper align="center" square style={{ padding:"50px"}} >
              <Container className={classes.typo}>
              <Typography className={classes.typo} variant ="h6">
                  Blood Group Selected: 
              </Typography>
              <Typography className={classes.typo}>
                Component:
              </Typography>
              <Typography className={classes.typo}>
                Units Required:  
              </Typography>
              <Typography className={classes.typo}>
                Total Amount:
              </Typography>
              <Button className={classes.typo} type="button" onClick={handleClick} variant="contained">Buy</Button>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    
    <Footer />
    </>
    )
}

export default Product;