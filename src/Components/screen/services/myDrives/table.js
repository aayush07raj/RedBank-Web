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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";

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

function Row({ row, state, index, setList }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = (idx) => {
    if (window.confirm("Are you sure ?")) {
      const updatedList = [...state];
      updatedList[index].acceptedDonors[idx].hasGivenBlood = true;
      setList(updatedList);
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="center">{row.startDate}</TableCell>
        <TableCell align="center">{row.startTime}</TableCell>
        <TableCell align="center">{row.endDate}</TableCell>
        <TableCell align="center">{row.endTime}</TableCell>
        <TableCell align="center">{row.state}</TableCell>
        <TableCell align="center">{row.district}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.pincode}</TableCell>
        <TableCell align="center">{row.bloodGroupsInvited}</TableCell>
        <TableCell align="center">
          <Button size="small" onClick={() => setOpen(!open)}>
            View list
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="left"
              >
                List of Donors :
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Blood Group</TableCell>
                    <TableCell align="center">Has Given Blood</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.acceptedDonors.map((item, idx) => (
                    <TableRow key={item.donorId} align="center">
                      <TableCell align="center">{item.donorName}</TableCell>
                      <TableCell align="center">{item.bloodGroup}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          disabled={
                            state[index].acceptedDonors[idx].hasGivenBlood
                          }
                          onClick={(e) => {
                            handleClick(idx);
                          }}
                        >
                          {state[index].acceptedDonors[idx].hasGivenBlood ? (
                            <p>Given !</p>
                          ) : (
                            <p>Given ?</p>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

export default function CollapsibleTable() {
  const [drivesList, setList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .post("http://localhost:5000/finddrives", {
        pincode: "111112",
      })
      .then((response) => {
        if (response.data.success) {
          setList(response.data.upcomingDrivesList);
        }
      });
  }, []);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
            <StyledTableCell align="center">State</StyledTableCell>
            <StyledTableCell align="center">District</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Pincode</StyledTableCell>
            <StyledTableCell align="center">
              Blood Groups Invited
            </StyledTableCell>
            <StyledTableCell align="center">Donors List</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivesList.map((row, idx) => (
            <Row
              key={row.startDate}
              row={row}
              state={drivesList}
              index={idx}
              setList={setList}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
