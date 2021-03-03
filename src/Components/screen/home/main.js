import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Container, Grid } from "@material-ui/core/";
import { Navbar, Footer } from "../../layouts";
import ServiceCard from "./serviceCard";
import { useDispatch, useSelector } from "react-redux";
import logging from "../../../redux/Actions/login";
import {
  BankServices,
  IndividualServices,
  HospitalServices,
} from "./services/Services";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://unblast.com/wp-content/uploads/2020/04/Female-Doctor-Vector-Illustration.jpg')`,
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
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

function Main() {
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);

  const [notify, setNotify] = React.useState("");
  const [name, setName] = React.useState("");

  useEffect(() => {
    if (loggedInState.userType === 1) {
      axios
        .get("http://localhost:8080/profile/fetchuserprofile", {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          setName(response.data.name);
          if (response.data.donorStatus === 2) {
            setNotify("not eligible");
          } else {
            setNotify("eligible");
          }
        })
        .catch();
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="Home">
        <Box className={classes.hero}>
          <Box>Red Bank</Box>
        </Box>
        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Grid container spacing={8} justify="flex-start">
            <Grid item xs={12} align="center">
              <Typography variant="h6" className={classes.space}>
                Hello {name}, you are {notify} to donate blood
              </Typography>
              <Typography variant="h4">Services provided by us</Typography>
            </Grid>

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
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Main;
