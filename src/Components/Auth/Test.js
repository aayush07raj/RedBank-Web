import React from "react";

import { Grid, Divider, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SideMenu from "../layouts/SideMenu";
import Navbar from "../layouts/navbar";

const styles = makeStyles({
  styleDiv: {
    paddingLeft: "300px",
    width: "100%",
  },
  h1: {
    paddingLeft: "100px",
    marginTop: "60px",
  },
  paper: {
    height: "400px",
    width: "450px",
  },
});

function Test() {
  const classes = styles();
  return (
    <>
      <SideMenu />
      <div className={classes.styleDiv}>
        <Navbar />
        <h1 className={classes.h1}>My Profile</h1>
        <Divider />

        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper} elevation={5}>
              <form></form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Test;
