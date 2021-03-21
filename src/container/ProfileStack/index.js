import React, { useEffect, useState } from "react";
import { makeStyles, Container, Paper } from "@material-ui/core";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import PageHeader from "../../component/pageHeader";
import { useSelector } from "react-redux";
import IndProfile from "./indProfile";
import HosProfile from "./hospProfile";
import BbProfile from "./bbProfile";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);
  const [subtitle, setState] = useState("");

  useEffect(() => {
    if (loggedInState.userType === 1) {
      setState("Name, Email, Date of Birth, BloodGroup");
    } else {
      setState("Name, Email, License Number");
    }
  }, []);

  return (
    <>
      <Navbar />
      <PageHeader
        title="My Profile "
        subtitle={` Here you can view as well as edit your profile details. Some fields( ${subtitle} ) kept uneditable due to security purposes `}
      />
      <Container maxWidth="lg">
        {/* <Profile /> */}
        <Paper className={classes.paperStyle} elevation={2}>
          {loggedInState.userType === 1 ? (
            <IndProfile />
          ) : (
            <>{loggedInState.userType === 2 ? <HosProfile /> : <BbProfile />}</>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default App;
