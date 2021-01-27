import React from "react";

import { Grid, Paper, Divider } from "@material-ui/core";
import LoggedOutNavbar from "../layouts/loggedoutNavbar";
import TnC from "./images/TnC.png";

const paperStyle = {
  display: "flex",
  width: 580,
  flexDirection: "column",
  padding: "50px",
  borderRadius: "10px",
};
const margin = { marginTop: "20px" };

function Terms() {
  return (
    <>
      <LoggedOutNavbar />
      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item xs={6} container justify="center" alignItems="center">
          <img src={TnC} alt="TnC" width="800px" height="600px" />
        </Grid>

        <Grid item xs={6} container justify="center" alignItems="center">
          <Paper elevation={5} style={paperStyle}>
            <Grid>
              <h1 align="center">Terms & Conditions</h1>
              <Divider />
              <h5 style={margin}>
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
