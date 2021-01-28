import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from "./logo.svg";


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  logo:{
    height:100,
    marginLeft: theme.spacing(10)
  },
  text:{
    textAlign: "center",
    color: "#FFFFFF"
  },
  list:{
    padding: theme.spacing(3, 2),
    color: "#FFFFFF"
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: "#E94364",
    height:'20vh'
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Grid container spacing={3}>
       
        <Grid item xs={4}>
          <img src={Logo} alt="logo" className={classes.logo} />
        </Grid>
       
       
        <Grid item xs={2}  className={ classes.list}>
          <ul>Contact Us</ul>
          <li>Facebook</li>
          <li>Linkedin</li>
          <li>Instagram</li>
        </Grid>
       
       
        <Grid item xs={3}>
          <Typography className={classes.text}>
              About
              <ul>Lorem lipsum For a Better</ul>
              <ul> World crap phrase lorem lipsum</ul>
          </Typography>
        </Grid>
       
       
        <Grid item xs={3} className={classes.text}>
          Services
          <ul> </ul>
          <ul>Buy Blood</ul>
          <ul>Find Donors</ul>
          <ul>Active Donor Request</ul>
          <ul>My Purchases </ul>

        </Grid>
        </Grid>
      </footer>
    </div>
  );
}

export default Footer;