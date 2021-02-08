import React from 'react';
import { makeStyles } from "@material-ui/core";
import Profile from "./profile";
import { Navbar, Footer } from "../../layouts";

const useStyles = makeStyles({
    appMain: {
      width: "100%",
    },
  });
  
  function App() {
    const classes = useStyles();
    return (
      <>
        <Navbar/>
        <div className={classes.appMain}>
          <Profile />
        </div>
        <Footer/>
      </>
    );
  }
  
  export default App;
  