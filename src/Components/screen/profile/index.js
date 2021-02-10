import React from "react";
import { makeStyles, Container } from "@material-ui/core";
import Profile from "./profile";
import { Navbar, Footer } from "../../layouts";
import PageHeader from "./pageHeader";

function App() {
  return (
    <>
      <Navbar />
      <PageHeader
        title="My Profile"
        subtitle="Here you can view as well as edit your profile details. Some fields ( Name, Email, License number ) kept uneditable due to security purposes "
      />
      <Container maxWidth="md">
        <Profile />
      </Container>
      <Footer />
    </>
  );
}

export default App;
