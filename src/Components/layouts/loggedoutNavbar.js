import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from "./redbanklogo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo:{
    height:40,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function LoggedOutNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#E94364'}}>
      <Toolbar to="/" component={Link} variant="dense">
        <img src={Logo} alt="logo" className={classes.logo} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default LoggedOutNavbar;