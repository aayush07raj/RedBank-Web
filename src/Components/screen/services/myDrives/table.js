import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { Button } from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

// const handleClick = (idx) => {
//   if (window.confirm("Are you sure ?")) {
//     const updatedList = [...state];
//     updatedList[index].acceptedDonors[idx].hasGivenBlood = true;
//     setList(updatedList);
//   }
// };

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

export default function CollapsibleTable() {
  const [drivesList, setList] = useState([]);
  const [acceptedDonors, setDonors] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:5000/mydrives").then((response) => {
      if (response.data.success) {
        setList(response.data.driveData);
        console.log(response.data);
      }
    });

    setDonors([]);
  }, []);

  const handleClick = (driveId) => {
    axios
      .post("http://localhost:5000/donorList", { driveId })
      .then((response) => {
        if (response.data.success) {
          setDonors(response.data.acceptedDonors);
        }
      });

    //  axios
    //    .post(
    //      "http://localhost:5000/donorList",
    //      { driveId },
    //      {
    //        headers: {
    //          Authorization: loggedState.userToken,
    //        },
    //      }
    //    )
    //    .then((response) => {
    //      if (response.data.success) {
    //        console.log(response);
    //        setDonors(response.data.acceptedDonors);
    //      }
    //    });
  };

  const handleCancel = (idx) => {
    if (window.confirm("Are you sure ?")) {
      const updatedList = [...drivesList];
      updatedList[idx].cancel = true;
      setList(updatedList);
    }
  };

  useEffect(() => {
    if (acceptedDonors.length !== 0) {
      history.push({
        pathname: "/acceptedDonors",
        acceptedDonors,
        setDonors,
      });
    }
  }, [acceptedDonors]);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Drive Id</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">
              Blood Groups Invited
            </StyledTableCell>
            <StyledTableCell align="center">Donors List</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Cancel drive</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivesList.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell align="center">{row.driveId}</TableCell>
              <TableCell align="center">
                {row.startDate} - {row.endDate}
              </TableCell>
              <TableCell align="center">
                {row.startTime} - {row.endTime}
              </TableCell>
              <TableCell align="center">
                {row.address}, {row.district}, {row.state}, {row.pincode}
              </TableCell>
              <TableCell align="center">{row.bloodGroupsInvited}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  onClick={(e) => {
                    handleClick(row.driveId);
                  }}
                >
                  View list
                </Button>
              </TableCell>
              <TableCell align="center">
                {drivesList[idx].cancel ? (
                  <p style={{ color: "red" }}>Canceled</p>
                ) : new Date(row.endDate).getTime() <= new Date().getTime() ? (
                  <p style={{ color: "grey" }}>Completed</p>
                ) : new Date(row.startDate).getTime() >=
                  new Date().getTime() ? (
                  <p style={{ color: "#007CFF" }}> Upcoming</p>
                ) : (
                  <p style={{ color: "green" }}> Active </p>
                )}
              </TableCell>
              <TableCell align="center">
                {new Date(row.endDate).getTime() <= new Date().getTime() ? (
                  <p>N/A</p>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      handleCancel(idx);
                    }}
                    disabled={drivesList[idx].cancel}
                  >
                    {drivesList[idx].cancel ? <p>Canceled</p> : <p>Cancel</p>}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
