import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Logo from "./logo.svg";
import Divider from "@material-ui/core/Divider";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo:{
    height:100,
    // marginLeft: theme.spacing(10)
  },
  text:{
    textAlign: "center",
    color: "#FFFFFF"
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: "#E94364",
    maxWidth:"100%"
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div position="static" className={classes.footer} style={{paddingTop:"50px",marginTop:"140px", margin:"auto", textAlign:"center" }} >
      <Grid container  spacing={2}>
      <Grid xs={12} sm={3} md={3}>
        <Typography  gutterBottom color={"textSecondary"}>
        <img src={Logo} alt="logo" className={classes.logo} />
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={3} md={3}>
        <Typography align={"center"} className={classes.text} gutterBottom >
             <ul className={classes.text}>Contact Us</ul>
             <ul><Button className={classes.text} startIcon={<FacebookIcon/>} > Facebook </Button></ul>
             <ul><Button className={classes.text} startIcon={<LinkedInIcon/>}>Linkedin</Button></ul>
             <ul><Button className={classes.text} startIcon={<InstagramIcon/>}>Instagram</Button></ul>
             <ul><Button className={classes.text} startIcon={<YouTubeIcon/>}>Youtube</Button></ul>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3} md={3}>
        <Typography align={"center"} gutterBottom color={"textSecondary"} className={classes.text}>
              About
              <ul>Through this app you can </ul>
              <ul>share Happiness to the one</ul>
              <ul>who are in need, Donate Blood,</ul>
              <ul>Donate Happiness.</ul>
          </Typography>
      </Grid>

      <Grid item xs={12} sm={3} md={3}>
        <Typography align={"center"} gutterBottom className={classes.text} >
          <ul className={classes.text}>SERVICES OFFERED</ul>
          <ul><Button component={Link} to="/BuyBlood" className={classes.text}>Buy Blood</Button></ul>
          <ul><Button component={Link} to="/FindDonors" className={classes.text}>Find Donors</Button></ul>
          <ul><Button component={Link} to="/MyDonationReq" className={classes.text}>My Donation Request</Button></ul>
          <ul><Button component={Link} to="/MyPurhcases" className={classes.text}>My Purchases</Button></ul>
        </Typography>
      </Grid>
    </Grid>
    <Divider style={{ margin:"24px auto",width:60}}/>
      <Typography className={classes.text}>
        © Copyright 2021
      </Typography>
    </div>
  
  )
}

export default Footer;