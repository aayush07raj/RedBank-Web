import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useStyles } from "../../ServicesStack/serviceCSS";

import PageHeader from "../../../component/pageHeader";

function InviteesList(props) {
  const classes = useStyles();
  const { donorsList, setDonors, donationId } = props.location;
  const loggedInState = useSelector((state) => state.loggedIn);
  const [newDonorsList, setNewDonorsList] = useState([...donorsList]);

  const handleClick = (idx) => {
    axios
      .put(
        "http://localhost:8080/donationrequests/donationdonorverification",
        {
          donationId: donationId,
          userId: newDonorsList[idx].userId,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        setNewDonorsList((prevState) => {
          var updatedList = [...prevState];
          updatedList[idx].donationStatus = true;
          return updatedList;
        });
      });
  };

  return (
    <>
      <Navbar />
      <PageHeader
        title="Invitees List "
        subtitle="list of the Invitees of the selected Request."
      />
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
            <TableContainer component={Paper} className={classes.root}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Donor Id</TableCell>
                    <TableCell align="left">Donor Name</TableCell>
                    <TableCell align="left">Blood Group</TableCell>
                    <TableCell align="left">Donation Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newDonorsList.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left">{row.userId}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.bloodGroup}</TableCell>
                      <TableCell align="left">
                        {row.acceptance === 2 ? (
                          <p style={{ fontWeight: "bold" }}>Pending</p>
                        ) : row.acceptance === 0 ? (
                          <p style={{ fontWeight: "bold", color: "red" }}>
                            Rejected
                          </p>
                        ) : (
                          <Button
                            disabled={newDonorsList[idx].donationStatus}
                            variant="contained"
                            color="secondary"
                            onClick={(e) => handleClick(idx)}
                          >
                            Donated ?
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Container style={{ height: "290px" }} />
      <Footer />
    </>
  );
}

export default InviteesList;
