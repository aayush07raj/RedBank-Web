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

import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import BarChart from "./barChart";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";

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
          data.data = response.data;
          return data;
        });
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
        setMonthlySales((prevState) => {
          const data = { ...prevState };
          data.data = response.data;
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
          data.data = response.data;
          return data;
        });
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
          data.data = response.data;
          return data;
        });
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

    if ((idx + "").length === 1) {
      idx = "0" + idx;
    }

    if (loggedInState.userType === 3) {
      //sales call
      //yearly call
      axios
        .get(`http://localhost:8080/salesanalytics/yearly/${currYear}/1`, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          setYearlySales((prevState) => {
            const data = { ...prevState };
            data.data = response.data;
            return data;
          });
        });

      //monthly call
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
          setMonthlySales((prevState) => {
            const data = { ...prevState };
            data.data = response.data;
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
            data.data = response.data;
            return data;
          });
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
          setMonthlyRevenue((prevState) => {
            const data = { ...prevState };
            data.data = response.data;
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
          data.data = response.data;
          return data;
        });
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
        setMonthlyPurchase((prevState) => {
          const data = { ...prevState };
          data.data = response.data;
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
        if (response.data[0]) {
          setInventoryData(response.data);
        }
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

  console.log(monthlySales);
  return (
    <>
      <Navbar />
      <PageHeader
        title=" My Analytics "
        subtitle="Here you can view statistics about your data that is present with us"
      />
      <Container maxWidth="lg">
        {loggedInState.userType === 3 ? (
          <div className={classes.tabs}>
            <AppBar position="static" color="transparent">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Sales " />
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
                {/* Sales graphs  */}
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
                      data={yearlySales.data ? yearlySales.data : {}}
                      labels={monthNames}
                      legends="Units sold"
                      type="yearly"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlySales.data &&
                      monthlySales.data.bloodObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlySales.data.bloodObject
                        : [1]
                    }
                    name="blood"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlySales.data &&
                      monthlySales.data.plasmaObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlySales.data.plasmaObject
                        : [1]
                    }
                    name="plasma"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlySales.data &&
                      monthlySales.data.plateletObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlySales.data.plateletObject
                        : [1]
                    }
                    name="platelet"
                  />
                </Grid>

                {/* Revenue graphs  */}
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
                      data={yearlyRevenue.data ? yearlyRevenue.data : {}}
                      legends="Revenue in Rs"
                      labels={monthNames}
                      type="yearly"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyRevenue.data &&
                      monthlyRevenue.data.bloodObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyRevenue.data.bloodObject
                        : [1]
                    }
                    name="blood"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyRevenue.data &&
                      monthlyRevenue.data.plasmaObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyRevenue.data.plasmaObject
                        : [1]
                    }
                    name="plasma"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyRevenue.data &&
                      monthlyRevenue.data.plateletObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyRevenue.data.plateletObject
                        : [1]
                    }
                    name="platelet"
                  />
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
                      data={yearlyPurchase.data ? yearlyPurchase.data : {}}
                      legends="Units purchased"
                      labels={monthNames}
                      type="yearly"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyPurchase.data &&
                      monthlyPurchase.data.bloodObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyPurchase.data.bloodObject
                        : [1]
                    }
                    name="blood"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyPurchase.data &&
                      monthlyPurchase.data.plasmaObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyPurchase.data.plasmaObject
                        : [1]
                    }
                    name="plasma"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyPurchase.data &&
                      monthlyPurchase.data.plateletObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyPurchase.data.plateletObject
                        : [1]
                    }
                    name="platelet"
                  />
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
                      data={yearlyPurchase.data ? yearlyPurchase.data : {}}
                      legends="Units purchased"
                      labels={monthNames}
                      type="yearly"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyPurchase.data &&
                      monthlyPurchase.data.bloodObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyPurchase.data.bloodObject
                        : [1]
                    }
                    name="blood"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyPurchase.data &&
                      monthlyPurchase.data.plasmaObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyPurchase.data.plasmaObject
                        : [1]
                    }
                    name="plasma"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PieChart
                    data={
                      monthlyPurchase.data &&
                      monthlyPurchase.data.plateletObject.reduce(
                        (a, b) => a + b,
                        0
                      ) !== 0
                        ? monthlyPurchase.data.plateletObject
                        : [1]
                    }
                    name="platelet"
                  />
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
