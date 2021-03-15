import React, { useEffect, useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
import Profile from "./profile";
import { Navbar, Footer } from "../../layouts";
import PageHeader from "./pageHeader";
import { useDispatch, useSelector } from "react-redux";

function App() {
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
        title="My Profile"
        subtitle={`Here you can view as well as edit your profile details. Some fields( ${subtitle} ) kept uneditable due to security purposes `}
      />
      <Container maxWidth="lg">
        <Profile />
      </Container>
      <Footer />
    </>
  );
}

export default App;
