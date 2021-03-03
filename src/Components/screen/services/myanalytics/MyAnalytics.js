import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  InputLabel,
  Typography,
  Divider,
  Box,
  AppBar,
  Tab,
  Tabs,
} from "@material-ui/core";
import axios from "axios";
import { Navbar, Footer } from "../../../layouts";
import BarChart from "./barChart";
import LineChart from "./lineChart";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";

// Tabs data
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    width: "100%",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(4),
  },
  charts: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  // Tabs data
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
}));

function MyAnalytics() {
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);

  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [yearlySales, setYearlySales] = useState([]);

  const [currMonth, setCurrMonth] = useState(
    new Date().toLocaleString("en-us", { month: "long" })
  );
  const [monthlySales, setMonthlySales] = useState([]);

  const handleYearChange = (e) => {
    setCurrYear(e.target.value);

    axios
      .get(`http://localhost:8080/salesanalytics/fetchall/${e.target.value}`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setYearlySales(response.data);
        console.log(response);
      });
  };

  const handleMonthChange = (e) => {
    setCurrMonth(e.target.value);

    axios
      .get(
        `http://localhost:8080/salesanalytics/fetchcurrentmonth/${e.target.value}`,
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMonthlySales(response.data);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/salesanalytics/fetchall/${currYear}`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setYearlySales(response.data);
        console.log(response);
      });

    axios
      .get(
        `http://localhost:8080/salesanalytics/fetchcurrentmonth/${currMonth}`,
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMonthlySales(response.data);
      });
  }, []);

  // Tabs data
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          My Analytics
        </Typography>
        <Divider className={classes.heading} />
        <Typography variant="h6" className={classes.heading}>
          Here you can view statistics about your data that is present with us
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        {/* commented out grid will come here */}
        <div className={classes.tabs}>
          <AppBar position="static" color="transparent">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Sales " />
              <Tab label="Revenue " />
              <Tab label="Inventory " />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid
              container
              justify="center"
              className={classes.charts}
              spacing={5}
            >
              <Grid item xs={12}>
                <Typography variant="h5">Yearly wise sales:</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel>Select Year</InputLabel>
                  <Select
                    value={currYear}
                    onChange={handleYearChange}
                    renderValue={(currYear) => `${currYear}`}
                  >
                    <MenuItem value={"2021"}>2021</MenuItem>
                    <MenuItem value={"2020"}>2020</MenuItem>
                    <MenuItem value={"2019"}>2019</MenuItem>
                    <MenuItem value={"2018"}>2018</MenuItem>
                    <MenuItem value={"2017"}>2017</MenuItem>
                    <MenuItem value={"2016"}>2016</MenuItem>
                    <MenuItem value={"2015"}>2015</MenuItem>
                  </Select>
                  <FormHelperText>Analytics for: {currYear}</FormHelperText>
                </FormControl>
                <Grid item xs={12} align="center">
                  <BarChart
                    data={yearlySales.dataset}
                    legends={yearlySales.legend}
                    labels={yearlySales.labels}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Monthly wise sales:</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel>Select Month</InputLabel>
                  <Select
                    value={currMonth}
                    onChange={handleMonthChange}
                    renderValue={(currMonth) => `${currMonth}`}
                  >
                    <MenuItem value={"January"}>January</MenuItem>
                    <MenuItem value={"Febuary"}>Febuary</MenuItem>
                    <MenuItem value={"March"}>March</MenuItem>
                    <MenuItem value={"April"}>April</MenuItem>
                    <MenuItem value={"May"}>May</MenuItem>
                    <MenuItem value={"June"}>June</MenuItem>
                    <MenuItem value={"July"}>July</MenuItem>
                  </Select>
                  <FormHelperText>
                    Analytics for: {currMonth},{currYear}
                  </FormHelperText>
                </FormControl>
                <Grid item xs={12} align="center">
                  <BarChart
                    data={monthlySales.data}
                    legends={monthlySales.lagend}
                    labels={monthlySales.labels}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid
              container
              justify="center"
              className={classes.charts}
              spacing={5}
            >
              <Grid item xs={12}>
                <Typography variant="h5">Yearly wise revenue:</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel>Select Year</InputLabel>
                  <Select
                    value={currYear}
                    onChange={handleYearChange}
                    renderValue={(currYear) => `${currYear}`}
                  >
                    <MenuItem value={"2021"}>2021</MenuItem>
                    <MenuItem value={"2020"}>2020</MenuItem>
                    <MenuItem value={"2019"}>2019</MenuItem>
                    <MenuItem value={"2018"}>2018</MenuItem>
                    <MenuItem value={"2017"}>2017</MenuItem>
                    <MenuItem value={"2016"}>2016</MenuItem>
                    <MenuItem value={"2015"}>2015</MenuItem>
                  </Select>
                  <FormHelperText>Analytics for: {currYear}</FormHelperText>
                </FormControl>
                <Grid item xs={12} align="center">
                  <BarChart
                    data={yearlySales.dataset}
                    legends={yearlySales.legend}
                    labels={yearlySales.labels}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Monthly wise revenue:</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel>Select Month</InputLabel>
                  <Select
                    value={currMonth}
                    onChange={handleMonthChange}
                    renderValue={(currMonth) => `${currMonth}`}
                  >
                    <MenuItem value={"January"}>January</MenuItem>
                    <MenuItem value={"Febuary"}>Febuary</MenuItem>
                    <MenuItem value={"March"}>March</MenuItem>
                    <MenuItem value={"April"}>April</MenuItem>
                    <MenuItem value={"May"}>May</MenuItem>
                    <MenuItem value={"June"}>June</MenuItem>
                    <MenuItem value={"July"}>July</MenuItem>
                  </Select>
                  <FormHelperText>
                    Analytics for: {currMonth},{currYear}
                  </FormHelperText>
                </FormControl>
                <Grid item xs={12} align="center">
                  <BarChart
                    data={monthlySales.data}
                    legends={monthlySales.lagend}
                    labels={monthlySales.labels}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  className={classes.heading}
                  align="left"
                >
                  UNITS AVAILABLE :
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h5"
                  className={classes.heading}
                  align="center"
                >
                  Blood
                </Typography>
                <PieChart className={classes.heading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h5"
                  className={classes.heading}
                  align="center"
                >
                  Plasma
                </Typography>
                <PieChart className={classes.heading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h5"
                  className={classes.heading}
                  align="center"
                >
                  Platelets
                </Typography>
                <PieChart className={classes.heading} />
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default MyAnalytics;
