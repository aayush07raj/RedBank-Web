import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  Paper,
} from "@material-ui/core/";
import { Navbar, Footer } from "../../layouts";

// import YouTube from 'react-youtube';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),`,
    height: "600px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
}));

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

function Home(props) {
  const user  = props.location.user
  console.log(user);
  const classes = useStyles();

  return (
    <>
    <Navbar user={user}/>
    
    <div className="Home">
      <Box className={classes.hero}>
        <Box>About Us</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Services
        </Typography>
        <Grid container spacing={4} justify="left">
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Upcoming Drives</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Buy Blood</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Find Donor</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">My Purchases</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Grid container>
          <Grid xs={6}>
            <Card>
              <Typography>Table</Typography>

              <CardMedia
                component="img"
                image="https://www.blood.ca/sites/default/files/styles/max_650x650/public/2018-09/DonorRecipient-Chart_1.jpg?itok=2keH_33B/1920x1080"
                style={{ height: 650 }}
              ></CardMedia>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card>
              <Typography>Video Part</Typography>
              {/* <YouTube videoId="E9QxiGPwab4" opts={opts} onReady={videoReady} />; */}
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Grid container spacing={4} justify="left">
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Stats 1</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Stats 2</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Stats 3</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ height: 150, width: 220 }}>
              <Box p={4}>
                <Typography variant="h4">Stats 4</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
    <Footer/>
    </>
  );
}

export default Home;
