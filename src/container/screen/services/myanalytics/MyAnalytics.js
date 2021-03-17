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

import Navbar from "../../../../component/navbar";
import Footer from "../../../../component/footer";
import BarChart from "./barChart";
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
    // minWidth: 120,
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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currMonth, setCurrMonth] = useState(monthNames[new Date().getMonth()]);

  const [yearlySales, setYearlySales] = useState({});
  const [monthlySales, setMonthlySales] = useState({});
  const [inventoryData, setInventoryData] = useState([]);

  const [yearlyRevenue, setYearlyRevenue] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState({});

  const [yearlyPurchase, setYearlyPurchase] = useState({});
  const [monthlyPurchase, setMonthlyPurchase] = useState([]);

  const handleYearChangeSales = (e) => {
    setCurrYear(e.target.value);
    axios
      .get(`http://localhost:8080/salesanalytics/yearly/${e.target.value}/1`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setYearlySales((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
        console.log(response);
      });
  };

  const handleMonthChangeSales = (e) => {
    setCurrMonth(e.target.value);

    let idx =
      1 +
      monthNames.findIndex((val) => {
        return val === e.target.value;
      });

    if ((idx + "").length === 1) {
      idx = "0" + idx;
    }

    axios
      .get(
        `http://localhost:8080/salesanalytics/monthly/${currYear}/${idx}/1`,
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMonthlySales((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
      });
  };

  const handleYearChangeRevenue = (e) => {
    setCurrYear(e.target.value);
    axios
      .get(`http://localhost:8080/salesanalytics/yearly/${e.target.value}/0`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setYearlyRevenue((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
        console.log(response);
      });
  };

  const handleMonthChangeRevenue = (e) => {
    setCurrMonth(e.target.value);
    let idx =
      1 +
      monthNames.findIndex((val) => {
        return val === e.target.value;
      });

    if ((idx + "").length === 1) {
      idx = "0" + idx;
    }
    axios
      .get(
        `http://localhost:8080/salesanalytics/monthly/${currYear}/${idx}/0`,
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMonthlyRevenue((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
      });
  };

  const handleYearChangePurchase = (e) => {
    setCurrYear(e.target.value);
    axios
      .get(`http://localhost:8080/salesanalytics/yearly/${e.target.value}/2`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setYearlyPurchase((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
        console.log(response);
      });
  };

  const handleMonthChangePurchase = (e) => {
    setCurrMonth(e.target.value);
    let idx =
      1 +
      monthNames.findIndex((val) => {
        return val === e.target.value;
      });

    if ((idx + "").length === 1) {
      idx = "0" + idx;
    }
    axios
      .get(
        `http://localhost:8080/salesanalytics/monthly/${currYear}/${idx}/2`,
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMonthlyPurchase((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
      });
  };

  useEffect(() => {
    let idx =
      1 +
      monthNames.findIndex((val) => {
        return val === currMonth;
      });
    console.log(idx);

    if ((idx + "").length === 1) {
      idx = "0" + idx;
    }

    console.log(idx);

    if (loggedInState.userType === 3) {
      console.log("3");
      //sales call
      axios
        .get(`http://localhost:8080/salesanalytics/yearly/${currYear}/1`, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          setYearlySales((prevState) => {
            const data = { ...prevState };
            data.data = response.data.datasets[0].data;
            data.labels = response.data.labels;
            return data;
          });
          console.log(response);
        });

      axios
        .get(
          `http://localhost:8080/salesanalytics/monthly/${currYear}/${idx}/1`,
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setMonthlySales((prevState) => {
            const data = { ...prevState };
            data.data = response.data.datasets[0].data;
            data.labels = response.data.labels;
            return data;
          });
        });

      // revenue call
      axios
        .get(`http://localhost:8080/salesanalytics/yearly/${currYear}/0`, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          setYearlyRevenue((prevState) => {
            const data = { ...prevState };
            data.data = response.data.datasets[0].data;
            data.labels = response.data.labels;
            return data;
          });
          console.log(response);
        });

      axios
        .get(
          `http://localhost:8080/salesanalytics/monthly/${currYear}/${idx}/0`,
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setMonthlyRevenue((prevState) => {
            const data = { ...prevState };
            data.data = response.data.datasets[0].data;
            data.labels = response.data.labels;
            return data;
          });
        });
    }

    //purchase call
    axios
      .get(`http://localhost:8080/salesanalytics/yearly/${currYear}/2`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setYearlyPurchase((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
        console.log(response);
      });

    axios
      .get(
        `http://localhost:8080/salesanalytics/monthly/${currYear}/${currMonth}/2`,
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMonthlyPurchase((prevState) => {
          const data = { ...prevState };
          data.data = response.data.datasets[0].data;
          data.labels = response.data.labels;
          return data;
        });
      });

    //inventory call
    axios
      .get("http://localhost:8080/inventory/receieveinventory", {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        console.log(response.data);
        setInventoryData(response.data);
        // }
      })
      .catch((err) => {
        console.log(err.message);
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
          My Analytics- <Typography variant="h6" style={{display:"inline-block"}}>
          Here you can view statistics about your data that is present with us
        </Typography>
        </Typography>
       
        
      </Paper>
      <Container maxWidth="lg">
        {loggedInState.userType === 3 ? (
          <div className={classes.tabs}>
            <AppBar position="static" color="transparent">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Sales " />
                <Tab label="Revenue " />
                <Tab label="Purchase " />
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
                      onChange={handleYearChangeSales}
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
                      data={yearlySales.data}
                      labels={yearlySales.labels}
                      legends="Units sold"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Monthly wise sales:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Select Month</InputLabel>
                    <Select
                      value={currMonth}
                      onChange={handleMonthChangeSales}
                      renderValue={(currMonth) => `${currMonth}`}
                    >
                      <MenuItem value={"January"}>January</MenuItem>
                      <MenuItem value={"Febuary"}>Febuary</MenuItem>
                      <MenuItem value={"March"}>March</MenuItem>
                      <MenuItem value={"April"}>April</MenuItem>
                      <MenuItem value={"May"}>May</MenuItem>
                      <MenuItem value={"June"}>June</MenuItem>
                      <MenuItem value={"July"}>July</MenuItem>
                      <MenuItem value={"August"}>August</MenuItem>
                      <MenuItem value={"September"}>September</MenuItem>
                      <MenuItem value={"October"}>October</MenuItem>
                      <MenuItem value={"November"}>November</MenuItem>
                      <MenuItem value={"December"}>December</MenuItem>
                    </Select>
                    <FormHelperText>
                      Analytics for: {currMonth},{currYear}
                    </FormHelperText>
                  </FormControl>
                  <Grid item xs={12} align="center">
                    <BarChart
                      data={monthlySales.data}
                      legends="Units sold"
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
                      onChange={handleYearChangeRevenue}
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
                      data={yearlyRevenue.data}
                      legends="Revenue in Rs"
                      labels={yearlyRevenue.labels}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Monthly wise revenue:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Select Month</InputLabel>
                    <Select
                      value={currMonth}
                      onChange={handleMonthChangeRevenue}
                      renderValue={(currMonth) => `${currMonth}`}
                    >
                      <MenuItem value={"January"}>January</MenuItem>
                      <MenuItem value={"Febuary"}>Febuary</MenuItem>
                      <MenuItem value={"March"}>March</MenuItem>
                      <MenuItem value={"April"}>April</MenuItem>
                      <MenuItem value={"May"}>May</MenuItem>
                      <MenuItem value={"June"}>June</MenuItem>
                      <MenuItem value={"July"}>July</MenuItem>
                      <MenuItem value={"August"}>August</MenuItem>
                      <MenuItem value={"September"}>September</MenuItem>
                      <MenuItem value={"October"}>October</MenuItem>
                      <MenuItem value={"November"}>November</MenuItem>
                      <MenuItem value={"December"}>December</MenuItem>
                    </Select>
                    <FormHelperText>
                      Analytics for: {currMonth},{currYear}
                    </FormHelperText>
                  </FormControl>
                  <Grid item xs={12} align="center">
                    <BarChart
                      data={monthlyRevenue.data}
                      legends="Revenue in Rs"
                      labels={monthlyRevenue.labels}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid
                container
                justify="center"
                className={classes.charts}
                spacing={5}
              >
                <Grid item xs={12}>
                  <Typography variant="h5">Yearly wise purchase:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Select Year</InputLabel>
                    <Select
                      value={currYear}
                      onChange={handleYearChangePurchase}
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
                      data={yearlyPurchase.data}
                      legends="Units purchased"
                      labels={yearlyPurchase.labels}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Monthly wise purchase:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Select Month</InputLabel>
                    <Select
                      value={currMonth}
                      onChange={handleMonthChangePurchase}
                      renderValue={(currMonth) => `${currMonth}`}
                    >
                      <MenuItem value={"January"}>January</MenuItem>
                      <MenuItem value={"Febuary"}>Febuary</MenuItem>
                      <MenuItem value={"March"}>March</MenuItem>
                      <MenuItem value={"April"}>April</MenuItem>
                      <MenuItem value={"May"}>May</MenuItem>
                      <MenuItem value={"June"}>June</MenuItem>
                      <MenuItem value={"July"}>July</MenuItem>
                      <MenuItem value={"August"}>August</MenuItem>
                      <MenuItem value={"September"}>September</MenuItem>
                      <MenuItem value={"October"}>October</MenuItem>
                      <MenuItem value={"November"}>November</MenuItem>
                      <MenuItem value={"December"}>December</MenuItem>
                    </Select>
                    <FormHelperText>
                      Analytics for: {currMonth},{currYear}
                    </FormHelperText>
                  </FormControl>
                  <Grid item xs={12} align="center">
                    <BarChart
                      data={monthlyPurchase.data}
                      legends="Units purchased"
                      labels={monthlyPurchase.labels}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    align="left"
                  >
                    Units available :
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
                  <PieChart
                    className={classes.heading}
                    data={inventoryData[0]}
                    name="bb"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    align="center"
                  >
                    Plasma
                  </Typography>
                  <PieChart
                    className={classes.heading}
                    data={inventoryData[1]}
                    name="bb"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    align="center"
                  >
                    Platelets
                  </Typography>
                  <PieChart
                    className={classes.heading}
                    data={inventoryData[2]}
                    name="bb"
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </div>
        ) : loggedInState.userType === 2 ? (
          <div className={classes.tabs}>
            <AppBar position="static" color="transparent">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Purchase " />
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
                  <Typography variant="h5">Yearly wise purchase:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Select Year</InputLabel>
                    <Select
                      value={currYear}
                      onChange={handleYearChangePurchase}
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
                      data={yearlyPurchase.data}
                      legends="Units purchased"
                      labels={yearlyPurchase.labels}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Monthly wise purchase:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Select Month</InputLabel>
                    <Select
                      value={currMonth}
                      onChange={handleMonthChangePurchase}
                      renderValue={(currMonth) => `${currMonth}`}
                    >
                      <MenuItem value={"January"}>January</MenuItem>
                      <MenuItem value={"Febuary"}>Febuary</MenuItem>
                      <MenuItem value={"March"}>March</MenuItem>
                      <MenuItem value={"April"}>April</MenuItem>
                      <MenuItem value={"May"}>May</MenuItem>
                      <MenuItem value={"June"}>June</MenuItem>
                      <MenuItem value={"July"}>July</MenuItem>
                      <MenuItem value={"August"}>August</MenuItem>
                      <MenuItem value={"September"}>September</MenuItem>
                      <MenuItem value={"October"}>October</MenuItem>
                      <MenuItem value={"November"}>November</MenuItem>
                      <MenuItem value={"December"}>December</MenuItem>
                    </Select>
                    <FormHelperText>
                      Analytics for: {currMonth},{currYear}
                    </FormHelperText>
                  </FormControl>
                  <Grid item xs={12} align="center">
                    <BarChart
                      data={monthlyPurchase.data}
                      legends="Units purchased"
                      labels={monthlyPurchase.labels}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    className={classes.heading}
                    align="left"
                  >
                    Units available :
                  </Typography>
                </Grid>
                {inventoryData.length > 0 ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h5"
                        className={classes.heading}
                        align="center"
                      >
                        Blood
                      </Typography>
                      <PieChart
                        className={classes.heading}
                        data={inventoryData[0]}
                        name="hos"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h5"
                        className={classes.heading}
                        align="center"
                      >
                        Plasma
                      </Typography>
                      <PieChart
                        className={classes.heading}
                        data={inventoryData[1]}
                        name="hos"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h5"
                        className={classes.heading}
                        align="center"
                      >
                        Platelets
                      </Typography>
                      <PieChart
                        className={classes.heading}
                        data={inventoryData[2]}
                        name="hos"
                      />
                    </Grid>
                  </>
                ) : (
                  <p>works</p>
                )}
              </Grid>
            </TabPanel>
          </div>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}

export default MyAnalytics;
