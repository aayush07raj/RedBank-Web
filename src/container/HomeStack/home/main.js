import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  IconButton,
  Collapse,
  Grid,
  Divider,
  Button,
  Paper,
} from "@material-ui/core/";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import ServiceCard from "../../../component/serviceCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BankServices, IndividualServices, HospitalServices } from "./Services";
import BloodTable from "../../../component/bloodCompatibilityTable";
import api from "../../../Apis/api";
import Carousel from "react-elastic-carousel";

const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: theme.spacing(3),
  },
  bloodTable: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  hero: {
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "4rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  box1: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://unblast.com/wp-content/uploads/2020/04/Female-Doctor-Vector-Illustration.jpg')`,
  },
  box2: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://scontent.fccu1-1.fna.fbcdn.net/v/t39.8562-6/101192362_887146031757958_1226508948815740928_n.png?_nc_cat=111&ccb=1-3&_nc_sid=6825c5&_nc_ohc=P7OAZNhLF34AX_49nJn&_nc_ht=scontent.fccu1-1.fna&oh=350a8064c6b266d929bb4800d8c1c2d8&oe=6084CE62')`,
  },
  box3: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://scontent.fccu1-1.fna.fbcdn.net/v/t39.8562-6/95273458_235645867523784_683176606411259904_n.png?_nc_cat=100&ccb=1-3&_nc_sid=6825c5&_nc_ohc=AMbKRZ9YMJUAX_4zIkX&_nc_ht=scontent.fccu1-1.fna&oh=e0dcc79ba4db8f7cec31d163a1bab770&oe=6085FE52')`,
  },
  blogsContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  button: {
    color: "white",
    marginTop: "20px",
    border: "2px solid white",
  },
}));

function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);

  const [notify, setNotify] = React.useState("");
  const [name, setName] = React.useState("");

  useEffect(() => {
    if (loggedInState.userType === 1) {
      api
        .get()
        .fetchUserProfile({
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          dispatch({
            type: "SET_DONOR_STATUS",
            donorStatus: response.data.donorStatus,
          });
          setName(response.data.name);
          if (response.data.donorStatus === 1) {
            setNotify("Active");
          } else if (response.data.donorStatus === 0) {
            setNotify("Inactive");
          } else {
            setNotify("Disabled");
          }
        })
        .catch();
    }
  }, [loggedInState]);

  return (
    <>
      <Navbar />
      <div>
        <Carousel
          style={{ marginTop: "5px" }}
          showArrows={false}
          enableAutoPlay
          autoPlaySpeed={5000}
        >
          {loggedInState.userType === 1 ? null : (
            <Box className={[classes.hero, classes.box2]}>
              <Button
                className={classes.button}
                component={Link}
                to="/ConductDrive"
                variant="outlined"
              >
                Conduct a Drive
              </Button>
            </Box>
          )}
          <Box className={[classes.hero, classes.box1]}>
            <Typography variant="h4"></Typography>
            <Button
              className={classes.button}
              variant="outlined"
              component={Link}
              to="/FindDonors"
            >
              {" "}
              Find a Donor
            </Button>
          </Box>
          <Box className={[classes.hero, classes.box3]}>
            <Typography variant="h4">Stats to be shown</Typography>
          </Box>
          {loggedInState.userType === 1 ? (
            <Box className={[classes.hero, classes.box2]}>
              <Button
                className={classes.button}
                component={Link}
                to="/UpcomingDrive"
                variant="outlined"
              >
                {" "}
                Donate Now
              </Button>
            </Box>
          ) : null}
        </Carousel>

        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Grid container justify="flex-start">
            <Grid item xs={12} align="center">
              {loggedInState.userType === 1 ? (
                <>
                  <Typography variant="h4" className={classes.space}>
                    Hello{" "}
                    <span style={{ color: "#E94364", fontWeight: "bold" }}>
                      {name}
                    </span>
                    , your current donor status :{" "}
                    <span style={{ color: "#E94364", fontWeight: "bold" }}>
                      {notify}
                    </span>
                  </Typography>
                  <Typography variant="h5" className={classes.space}>
                    Go to{" "}
                    <Button
                      component={Link}
                      to="/profile"
                      size="large"
                      color="secondary"
                    >
                      Profile
                    </Button>{" "}
                    to change the status
                  </Typography>
                </>
              ) : null}
              <Divider className={classes.space} />
            </Grid>
            <Grid item xs={12} align="center">
              <Typography className={classes.space} variant="h4">
                Services provided by us
              </Typography>
            </Grid>
            <Grid container spacing={3}>
              {loggedInState.userType === 1 ? (
                <>
                  {IndividualServices.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={3}>
                      <ServiceCard
                        key={idx}
                        img={item.image}
                        name={item.name}
                        descp={item.description}
                        page={item.page}
                      />
                    </Grid>
                  ))}
                </>
              ) : (
                <>
                  {loggedInState.userType === 3 ? (
                    <>
                      {BankServices.map((item, idx) => (
                        <Grid item xs={12} sm={6} md={3}>
                          <ServiceCard
                            key={idx}
                            img={item.image}
                            name={item.name}
                            descp={item.description}
                            page={item.page}
                          />
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <>
                      {HospitalServices.map((item, idx) => (
                        <Grid item xs={12} sm={6} md={3}>
                          <ServiceCard
                            key={idx}
                            img={item.image}
                            name={item.name}
                            descp={item.description}
                            page={item.page}
                          />
                        </Grid>
                      ))}
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>

          <Grid className={classes.bloodTable} container justify="center">
            <Grid item xs={6}>
              <Typography
                variant="h5"
                align="center"
                style={{ padding: "20px" }}
              >
                Blood Compatibility Table
              </Typography>
              <BloodTable />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Main;
