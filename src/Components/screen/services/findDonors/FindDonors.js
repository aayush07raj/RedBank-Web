import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { Navbar, Footer } from "../../../layouts";
import statesData from "../../../Auth/states.json";
import Table from "./useTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "550px",
    display: "flex",
    flexDirection: "column",
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

// const headCells = [
//   {
//     id: "fullName",
//     label: "Full Name",
//   },
//   {
//     id: "email",
//     label: "Email",
//   },
//   {
//     id: "contact",
//     label: "Contact",
//   },
//   {
//     id: "address",
//     label: "Address",
//   },
//   {
//     id: "bg",
//     label: "Blood Group",
//   },
// ];

function FindDonors() {
  // const records = [
  //   {
  //     Fullname: "A",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  //   {
  //     Fullname: "B",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  //   {
  //     Fullname: "Cr",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  //   {
  //     Fullname: "D",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  //   {
  //     Fullname: "E",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  //   {
  //     Fullname: "F",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  //   {
  //     Fullname: "G",
  //     Email: "saditya@gmail.com",
  //     Contact: "123456789",
  //     Address: "asdasdadasd",
  //     BloodGroup: "A+",
  //   },
  // ];

  const [data, setData] = useState({
    state: "",
    district: "",
    pincode: "",
    bg: [],
  });

  const [enable, setEnable] = useState(true);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        statesData.states.findIndex((item) => item.state === e.target.value)
      );
    }

    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper} elevation={5}>
                <h2 style={{ marginTop: "10px" }} align="center">
                  Find Donors
                </h2>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select your State</InputLabel>
                  <Select
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    label="Select your State"
                  >
                    {statesData.states.map((item, id) => (
                      <MenuItem key={id} value={item.state}>
                        {item.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select your District</InputLabel>
                  <Select
                    inputProps={{ readOnly: enable }}
                    name="district"
                    value={data.district}
                    onChange={handleChange}
                    label="Select your District"
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
                  label="Enter your Pincode"
                  type="text"
                  name="pincode"
                  value={data.pincode}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ maxLength: 10 }}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Select required Blood Groups</InputLabel>
                  <Select
                    multiple
                    label="Select required Blood Groups"
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
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FindDonors;
