import React from 'react';
import { makeStyles } from "@material-ui/core";
import SideMenu from "./sideMenu";
import Profile from "./profile";
import { Navbar, Footer } from "../../layouts";

const useStyles = makeStyles({
    appMain: {
      paddingLeft: "300px",
      width: "100%",
    },
  });
  
  function App() {
    const classes = useStyles();
    return (
      <>
        <Navbar/>
        <SideMenu />
        <div className={classes.appMain}>
          <Profile />
        </div>
        <Footer/>
      </>
    );
  }
  
  export default App;
  