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
} from "@material-ui/core";
import axios from "axios";
import { Navbar, Footer } from "../../../layouts";
import BarChart from "./barChart";
import LineChart from "./lineChart";
import {useSelector} from "react-redux"

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(1),
  },
  charts: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function MyAnalytics() {
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);
  const [currYear, setCurrYear] = useState(()=>{return new Date().getFullYear()})
  const [yearlySales , setYearlySales] = useState([])

  const [currMonth, setCurrMonth] = useState("")
  const [monthlySales , setMonthlySales] = useState([])
  

  const handleYearChange = (e)=>{
    setCurrYear(e.target.value)  

    axios
    .get(`http://localhost:8080/salesanalytics/fetchall/${e.target.value}`,{
      headers:{
        Authorization: "Bearer " + loggedInState.userToken,
      },
    })
    .then((response)=>{
      setYearlySales(response.data)
      console.log(response)
    })
  }

  useEffect(()=>{
    axios
    .get(`http://localhost:8080/salesanalytics/fetchall/${currYear}`,{
      headers:{
        Authorization: "Bearer " + loggedInState.userToken,
      },
    })
    .then((response)=>{
      setYearlySales(response.data)
      console.log(response)
    })
  },[])


  const handleMonthChange = (e)=>{
    setCurrMonth(e.target.value)

    axios
    .get(`http://localhost:8080/salesanalytics/fetchcurrentmonth/${e.target.value}`,{
      headers:{
        Authorization: "Bearer " + loggedInState.userToken,
      },
    })
    .then((response)=>{
      console.log(response)
      setMonthlySales(response.data);

    })
  }

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Analytics</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view statistics about your data that is present with us
        </Typography>
        
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.charts} spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Sales Yearly wise Sales:</Typography>
                <FormControl className={classes.formControl}>
                <InputLabel >Select Year</InputLabel>
                  <Select
                    value={currYear}
                    onChange={handleYearChange}
                    renderValue={(currYear) => `${currYear}`}>
                    <MenuItem value={"2020"}>2021</MenuItem>
                    <MenuItem value={"2020"}>2020</MenuItem>
                    <MenuItem value={"2019"}>2019</MenuItem>
                    <MenuItem value={"2018"}>2018</MenuItem>
                    <MenuItem value={"2017"}>2017</MenuItem>
                    <MenuItem value={"2016"}>2016</MenuItem>
                    <MenuItem value={"2015"}>2015</MenuItem>
                  </Select>
                  <FormHelperText>Analytics for: {currYear}</FormHelperText>
                </FormControl>
                <Grid item  xs={12} align="center">
                  <BarChart data={yearlySales.dataset} legends={yearlySales.legend} labels={yearlySales.labels} />
                </Grid>

                <Typography variant="h5">Monthly wise Sales:</Typography>
                <FormControl className={classes.formControl}>
                <InputLabel >Select Month</InputLabel>
                  <Select
                    value={currMonth}
                    onChange={handleMonthChange}
                    >
                    <MenuItem value={"January"}>January</MenuItem>
                    <MenuItem value={"Febuary"}>Febuary</MenuItem>
                    <MenuItem value={"March"}>March</MenuItem>
                    <MenuItem value={"April"}>April</MenuItem>
                    <MenuItem value={"May"}>May</MenuItem>
                    <MenuItem value={"June"}>June</MenuItem>
                    <MenuItem value={"July"}>July</MenuItem>
                  </Select>
                  <FormHelperText>Analytics for: {currMonth},{currYear}</FormHelperText>
                </FormControl>
                <Grid item  xs={12} align="center">
                  <BarChart data={monthlySales.data} legends={monthlySales.lagend} labels={monthlySales.labels} />
                </Grid>
          </Grid>

          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default MyAnalytics;
