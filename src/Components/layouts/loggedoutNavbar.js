import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: 40,
  },
}));

function LoggedOutNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#E94364" }}>
        <Toolbar>
          <Typography to="/" component={Link} variant="h6">
            <img src={Logo} alt="logo" className={classes.logo} />
          </Typography>
          <Typography variant="h5" style={{ padding: "10px" }}>
            RedBank
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default LoggedOutNavbar;
