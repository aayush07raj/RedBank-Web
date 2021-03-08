import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Logo from "./images/logo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    appbar: {
      background: 'none',
    },
    appbarWrapper: {
      width: '80%',
      margin: '0 auto',
    },
    appbarTitle: {
      flexGrow: '1',
    },
    icon: {
      color: '#fff',
      fontSize: '1  rem',
    },
    container: {
        display:"flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        textAlign: 'center',
        backgroundColor:'#E94364',
      },
      title: {
        color: 'white',
        fontSize: '4.5rem',
      },
      goDown: {
        fontSize: '4rem',
      },

}));

export default function FirstView(){
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
    setChecked(true);
    }, []);
   
    
    return (
        <>
        <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle} variant="h6">
            <img src={Logo} alt="logo" className={classes.logo} style={{marginTop:"10px",height:"5vh"}} />
          </h1>
          <IconButton>
            <Button size='medium' to="/Login" component={Link}  variant="outlined" className={classes.icon}>Get Started</Button>
          </IconButton>
        </Toolbar>
      </AppBar>
        <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            RedBank
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
      </>
    )
}