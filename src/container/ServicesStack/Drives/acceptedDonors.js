import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core/";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React from "react";
import api from "../../../Apis/api";

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
  heading: {
    marginBottom: theme.spacing(2),
  },
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(7),
  },
}));

export default function AcceptedDonors(props) {
  const { donorsList, setDonors, driveId } = props.location;
  const [newDonorsList, setNewDonorsList] = React.useState([...donorsList]);
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);

  const handleClick = (idx) => {
    api
      .put()
      .verifyDonorStatus(
        {
          driveId: driveId,
          userId: newDonorsList[idx].userId,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        var updatedList = [...newDonorsList];
        updatedList[idx].donationStatus = true;
        setNewDonorsList(updatedList);
      });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" align="center" className={classes.heading}>
          List of all Donors
        </Typography>
        <TableContainer component={Paper} className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Donor Id</StyledTableCell>
                <StyledTableCell align="left">Donor Name</StyledTableCell>
                <StyledTableCell align="left">Blood Group</StyledTableCell>
                <StyledTableCell align="left">Donation Status</StyledTableCell>
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
                        Given ?
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Container style={{ height: "150px" }} />
      <Footer />
    </>
  );
}
