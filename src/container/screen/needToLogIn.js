import React from "react";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import notFound from "../../assets/images/notFound.svg";
import { Route, Redirect } from "react-router-dom";

import { Link, useHistory } from "react-router-dom";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Backdrop,
    Typography,
    CircularProgress,
  } from "@material-ui/core";


function NotFound() {
  return (
    <>
    <LoggedOutNavbar/>
    <Grid>
    <Grid item xs={12} style={{marginTop:"20px"}} container justify="center" alignItems="center">
          <img src={notFound} alt="verify" style={{ width: "40%" }} />
    </Grid>
    <Grid item xs={12} container justify="center" alignItems="center">
        <h1>Error 404 : Page not found. You need to log in first to view this page </h1>
    </Grid>  
    <Grid item xs={12} container justify="center" alignItems="center">
       <Button style={{marginTop:"20p"}} variant="contained" component={Link} to="/Login"> Login</Button>
    </Grid>  
    </Grid>
    
      

    </>
  );
}

export default NotFound;
