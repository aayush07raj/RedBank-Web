import React from "react";
import LoggedOutNavbar from "./loggedoutNavbar";
import unAuth from "../assets/images/unAuth.svg";
import { Grid, Button } from "@material-ui/core";
function UnAuth() {
  return (
    <>
      <LoggedOutNavbar />
      <Grid>
        <Grid
          item
          xs={12}
          style={{ marginTop: "20px" }}
          container
          justify="center"
          alignItems="center"
        >
          <img src={unAuth} alt="verify" style={{ width: "40%" }} />
        </Grid>
        <Grid item xs={12} container justify="center" alignItems="center">
          <h1>Error 401 : You are not Authorised</h1>
        </Grid>
      </Grid>
    </>
  );
}

export default UnAuth;
