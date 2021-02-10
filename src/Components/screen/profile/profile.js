import React from "react";
import ProfileForm from "./profileForm";
import OrgForm from "./orgForm";
import { makeStyles, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

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
        <ProfileForm />
        {/* {loggedInState.userType === 0 ? <ProfileForm /> : <>
          {loggedInState.userType === 1 ? <OrgForm /> : <OrgForm />}
          </>} */}
      </Paper>
    </>
  );
}

export default Profile;
