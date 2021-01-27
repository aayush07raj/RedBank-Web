import React from 'react';
import ProfileForm from "./profileForm";
// import OrgForm from "./orgForm"
import PageHeader from "./pageHeader"
import { makeStyles, Paper } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    paperStyle: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
  }));

  function Profile(){
      const classes = useStyles();
      return (
          <>
          <PageHeader
        title="My Profile"
        subtitle="Here you can view as well as edit your profile details. Some fields ( Name, Email, License number ) kept uneditable due to security purposes "
      />
          <Paper className={classes.paperStyle} elevation={5}>
        <ProfileForm />
      </Paper>
          </>
      )
  }

  export default Profile;