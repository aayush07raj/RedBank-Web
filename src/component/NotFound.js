import React from "react";
import LoggedOutNavbar from "./loggedoutNavbar";
import notFound from "../assets/images/notFound.svg";
import { Grid, Button } from "@material-ui/core";
function NotFound() {
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
          <img src={notFound} alt="verify" style={{ width: "40%" }} />
        </Grid>
        <Grid item xs={12} container justify="center" alignItems="center">
          <h1>Error 404 : Page not found.</h1>
        </Grid>
      </Grid>
    </>
  );
}

export default NotFound;
