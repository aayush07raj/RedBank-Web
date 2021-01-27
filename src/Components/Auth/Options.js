import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";

import LoggedOutNavbar from "../layouts/loggedoutNavbar";
function Options() {
  const paperStyle = {
    display: "flex",
    width: 380,
    flexDirection: "column",
    padding: "30px",
  };
  const margin = { marginTop: "20px" };

  return (
    <>
      <LoggedOutNavbar />

      <Grid
        container
        style={{ marginTop: "100px", backgroundColor: "#E94364" }}
      >
        <Grid item xs={12} container justify="center" alignItems="center">
          <Paper elevation={5} style={paperStyle}>
            <Grid align="center">
              <h2 style={{ marginTop: "15px" }}>Which type of user are you?</h2>
              <Typography style={margin}>
                <Link to="/IndividualRegistration">Individual</Link>
              </Typography>
              <Typography style={margin}>
                <Link to="/BloodBankRegistration">Blood Bank</Link>
              </Typography>
              <Typography style={margin}>
                <Link to="/HospitalRegistration">Hospital/Clinic</Link>
              </Typography>
              <Divider style={margin} />
              <Typography style={margin}>
                <p>
                  Existing user ? <Link to="/">Sign in</Link>
                </p>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Options;
