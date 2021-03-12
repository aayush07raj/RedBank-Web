import React from "react";
import playIcon from "./images/playIcon.png";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Box,
  Grid,
  CardMedia,
  CardContent,
} from "@material-ui/core/";
import drives from "./images/drives.png";
import user from "./images/user.svg";
import findDonors from "./images/findDonors.png";
import inventory from "./images/inventory.png";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  container: {
    padding: theme.spacing(3),
  },
  cards: {
    padding: theme.spacing(10),
  },
  footer: {
    paddingTop: "30px",
    color: "white",
    textAlign: "center",
  },
  appDownload: {
    padding: "25px",
    color: "grey",
    textAlign: "center",
  },
}));
export default function SecondView() {
  const classes = useStyles();
  return (
    <div className={classes.root} id="place-to-visit">
      <Grid className={classes.container} container xs={12}>
      <Grid Container xs={12} >
        
        <Grid
         item
         md={12}
         style={{ justifyContent: "center", alignItems: "center" }}>
           <Box>
          
            <CardContent>
           <Typography className={classes.appDownload} variant="h5" >Download our App if you are on Android</Typography>
           </CardContent>
          </Box>
        </Grid>
        
      </Grid>
        <Grid className={classes.cards} item xs={12} md={3}>
          <Box>
            <CardMedia component="img" image={user} height="220" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                User Type
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Avail our Service as either an individual,hospital, or a blood
                bank.
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid className={classes.cards} item xs={12} md={3}>
          <Box>
            <CardMedia component="img" image={drives} height="200" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Organise Donation Drives
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                The community of donors at RedBank are always ready for an
                opportunity to save lives. Give them the opportunity do so by
                Organizing donation drives from within the app.
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid className={classes.cards} item xs={12} md={3}>
          <Box>
            <CardMedia component="img" image={findDonors} height="220" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Find Blood
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Buy Blood Components or find donors near you in case of
                emergencies
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid className={classes.cards} item xs={12} md={3}>
          <Box>
            <CardMedia component="img" image={inventory} height="200" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Invnentory Management
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                If you are a hospital or blood bank and you are looking for a
                way to manage your inventory hassle free, you have come to right
                place.
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
      
      <Grid
        Container
        style={{ backgroundColor: "#E94364", height: "28vh", maxWidth: "100%" }}
        xs={12}
      >
        <Grid
          item
          md={12}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography className={classes.footer} variant="h4">
            Your one deed will save someone's life
          </Typography>
          <Typography className={classes.footer} variant="h5">
            Give the gift of life - DONATE BLOOD
          </Typography>
          <CardMedia component="img" image={playIcon} style={{ height: "100px", width:"auto" }}/> 
        </Grid>
      </Grid>
    </div>
  );
}
