import React from "react";

import { Grid, Paper, Divider } from "@material-ui/core";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import TnC from "../../assets/images/TnC.png";
import {useStyles} from "./registerCSS"



function Terms() {
  const classes = useStyles();
  return (
    <>
      <LoggedOutNavbar />
      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item md={6} className={classes.image}  container justify="center" alignItems="center">
          <img src={TnC} alt="TnC" width="800px" height="600px" />
        </Grid>

        <Grid item xs={12} md={6} container justify="center" alignItems="center">
          <Paper elevation={5} className={classes.paperStyle}>
            <Grid>
              <h1 align="center">Terms & Conditions</h1>
              <Divider />
              <h5 className={classes.margin}>
                <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </li>
                </ul>
              </h5>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Terms;
