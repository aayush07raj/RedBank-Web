import React from "react";
import IndProfile from "./indProfile";
import HosProfile from "./hospProfile";
import BbProfile from "./bbProfile";
import { makeStyles, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import logging from "../../../redux/Actions/login";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

function Profile() {
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);
  return (
    <>
      <Paper className={classes.paperStyle} elevation={5}>
        {/* <IndProfile/> */}
        {loggedInState.userType === 1 ? <IndProfile /> : <>
          {loggedInState.userType === 2 ? <HosProfile /> : <BbProfile />}
          </>}
      </Paper>
    </>
  );
}

export default Profile;
