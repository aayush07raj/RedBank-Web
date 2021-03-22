import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  Divider,
  Button,
} from "@material-ui/core/";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import ServiceCard from "../../../component/serviceCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BankServices, IndividualServices, HospitalServices } from "./Services";
import axios from "axios";
import BloodTable from "../../../component/bloodCompatibilityTable";
import api from "../../../Apis/api";

const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: theme.spacing(3),
  },
  bloodTable: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://unblast.com/wp-content/uploads/2020/04/Female-Doctor-Vector-Illustration.jpg')`,
    height: "750px",
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
  }, []);

  return (
    <>
      <Navbar />
      <div className="Home">
        {/* <Box className={classes.hero}>
          <Box>Red Bank</Box>
        </Box> */}
        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Grid container spacing={8} justify="flex-start">
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
                  <Typography variant="h5">
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
