import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { Button, Container } from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core/";
import { Navbar, Footer } from "../../../layouts";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(7),
  },
}));

export default function AcceptedDonors(props) {
  const { acceptedDonors, setDonors } = props.location;
  const classes = useStyles();

  console.log(acceptedDonors);

  const handleClick = (idx) => {
    var updatedList = [...acceptedDonors];
    updatedList[idx].hasGivenBlood = true;
    setDonors(updatedList);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" align="center">
          List of all Donors
        </Typography>
        <TableContainer component={Paper} className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Donor Id</StyledTableCell>
                <StyledTableCell align="center">Donor Name</StyledTableCell>
                <StyledTableCell align="center">Blood Group</StyledTableCell>
                <StyledTableCell align="center">
                  Has Given Blood
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {acceptedDonors.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{row.donorId}</TableCell>
                  <TableCell align="center">{row.donorName}</TableCell>
                  <TableCell align="center">{row.bloodGroup}</TableCell>
                  <TableCell align="center">
                    <Button
                      disabled={acceptedDonors[idx].hasGivenBlood}
                      variant="contained"
                      color="secondary"
                      onClick={handleClick(idx)}
                    >
                      Given ?
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}
