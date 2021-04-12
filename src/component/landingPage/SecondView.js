import React from "react";
import playIcon from "../../assets/images/playIcon.png";
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Box,
  Grid,
  CardMedia,
  CardContent,
} from "@material-ui/core/";
import drives from "../../assets/images/drives.png";
import user from "../../assets/images/user.svg";
import findDonors from "../../assets/images/findBlood.png";
import inventory from "../../assets/images/inventory.png";

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: "30vh",
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
    paddingBottom: "25px",
    color: "black",
    textAlign: "center",
  },
}));

export default function SecondView() {
  const classes = useStyles();
  return (
    <div className={classes.root} id="place-to-visit">
      <Grid className={classes.container} container xs={12}>
        <Grid className={classes.cards} item xs={12} md={3}>
          <Box>
            <CardMedia component="img" image={user} height="220" />
            <CardContent>
              <Typography gutterBottom variant="h5">
                User Type
              </Typography>
              <Typography variant="h6" color="textSecondary">
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
              <Typography gutterBottom variant="h5">
                Organise Donation Drives
              </Typography>
              <Typography variant="h6" color="textSecondary">
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
              <Typography gutterBottom variant="h5">
                Find Blood
              </Typography>
              <Typography variant="h6" color="textSecondary">
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
              <Typography gutterBottom variant="h5">
                Invnentory Management
              </Typography>
              <Typography variant="h6" color="textSecondary">
                If you are a hospital or blood bank and you are looking for a
                way to manage your inventory hassle free, you have come to right
                place.
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>

      <Grid Container xs={12}>
        <Grid item style={{ justifyContent: "center", alignItems: "center" }}>
          <Typography className={classes.appDownload} variant="h5">
            Download our App if you are on Android
          </Typography>
        </Grid>
        <Grid item align="center">
          <CardMedia
            component="img"
            image={playIcon}
            style={{ height: "50px", width: "auto", marginBottom: "25px" }}
          />
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
          xs={12}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography className={classes.footer} variant="h4">
            Your one deed will save someone's life
          </Typography>
          <Typography className={classes.footer} variant="h5">
            Give the gift of life - DONATE BLOOD
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
