import { makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "300px",
    height: "100%",
    backgroundColor: "#E94364",
  },
});

function SideMenu() {
  const classes = styles();
  return (
    <>
      <div className={classes.sideMenu}></div>
    </>
  );
}

export default SideMenu;
