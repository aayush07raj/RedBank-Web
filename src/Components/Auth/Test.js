import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Navbar, Footer } from "../layouts";
import statesData from "../Auth/states.json";
import Table from "../screen/services/findDonors/useTable";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "550px",
    display: "flex",
    flexDirection: "column",
  },
  papers: {
    width: "100%",

    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(4),
  },
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 250,
  },
  tableContainer: {
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(3),
  },
  tables: {
    padding: theme.spacing(3),
  },
}));

function FindDonors() {
  const [data, setData] = useState({
    address: "",
    state: "",
    district: "",
    pincode: null,
    bg: "",
  });

  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const [donorsList, setList] = useState([]);
  const classes = useStyles();
  const regex = /^[0-9]*$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        statesData.states.findIndex((item) => item.state === value)
      );
    }
    const updatedData = { ...data };
    updatedData[name] = value;
    setData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .get("http://localhost:5000/donorlist")
      .then((response) => {
        if (response.data.success) {
          setList(response.data.list);
        }
      })
      .catch();
  };

  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.papers}>
        <Typography variant="h4">Find Donor</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can search any inidividual for blood donation. Fill the
          parameters and click on search.
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <TextField
                  className={classes.formControl}
                  label="Enter your address"
                  type="text"
                  name="address"
                  value={data.address}
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required State</InputLabel>
                  <Select
                    required
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    label="Select required State"
                  >
                    {statesData.states.map((item, id) => (
                      <MenuItem key={id} value={item.state}>
                        {item.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required District</InputLabel>
                  <Select
                    required
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                    label="Select required District"
                  >
                    {statesData.states[selectedStateIndex].districts.map(
                      (item, id) => (
                        <MenuItem key={id} value={item}>
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

                <TextField
                  className={classes.formControl}
                  label="Enter required Pincode"
                  type="number"
                  name="pincode"
                  value={data.pincode}
                  variant="outlined"
                  onChange={(e) => {
                    if (regex.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required Blood Group</InputLabel>
                  <Select
                    required
                    label="Select required Blood Groups *"
                    name="bg"
                    onChange={handleChange}
                    value={data.bg}
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.formControl}
                >
                  Search
                </Button>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.tableContainer}>
            {donorsList.length === 0 ? (
              <h3 align="center">Results will be displayed here</h3>
            ) : (
              <Table list={donorsList} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FindDonors;
