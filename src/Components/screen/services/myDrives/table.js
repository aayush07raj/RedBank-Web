import React from "react";
import PropTypes from "prop-types";
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
import Checkbox from "@material-ui/core/Checkbox";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                  {row.acceptedDonors.map((item) => (
                    <TableRow key={item.donorId} align="center">
                      <TableCell align="center">{item.donorName}</TableCell>
                      <TableCell align="center">{item.bloodGroup}</TableCell>
                      <TableCell align="center">
                        {item.hasGivenBlood ? (
                          <p>donoe</p>
                        ):(
                          <Button
                          variant ="contained">
                            Given ? 
                         </Button>
                        
                        )}
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

export default function CollapsibleTable({ list }) {
  var List = [];
  list.map((item) => {
    List.push(item);
  });
  console.log(List);

  return (
    <TableContainer component={Paper}>
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
          {List.map((row) => (
            <Row key={row.startDate} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}