import React from "react";
import LoggedOutNavbar from "../../component/loggedoutNavbar";
import notFound from "../../assets/images/notFound.svg";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

function NotFound() {
  const loggedIn = useSelector((state) => state.loggedIn);
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
          <h1>
            Error 404 : Page not found. You need to log in first to view this
            page{" "}
          </h1>
        </Grid>
        {loggedIn.isLoggedIn ? null : (
          <Grid item xs={12} container justify="center" alignItems="center">
            <Button
              style={{ marginTop: "20p" }}
              variant="contained"
              component={Link}
              to="/Login"
            >
              {" "}
              Login
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default NotFound;
