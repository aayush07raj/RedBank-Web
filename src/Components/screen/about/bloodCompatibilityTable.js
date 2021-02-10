import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#E94364",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(bloodType, donors, receivers) {
  return { bloodType, donors, receivers };
}

const rows = [
  createData("A+", "A+, AB+", "A+, A-, O+, O-"),
  createData("A-", "A+, A-, AB+, AB-", "A-, O-"),
  createData("B+", "B+, AB+", "B+, B-, O+, O-"),
  createData("B-", "B+, B-, AB+, AB-", "B-, O-"),
  createData("AB+", "AB+", "EVERYONE"),
  createData("AB-", "AB+, AB-", "A-, B-, O-, AB-"),
  createData("O+", "O+, A+, B+, AB+", "O+, O-"),
  createData("O-", "EVERYONE", "O-"),
];

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell colspan={3} align="left">
              Compatible Blood-Type Donors
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Blood Type</StyledTableCell>
            <StyledTableCell align="center">Donate Blood To</StyledTableCell>
            <StyledTableCell align="center">Receive Blood From</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.bloodType}>
              <StyledTableCell align="center">{row.bloodType}</StyledTableCell>
              <StyledTableCell align="center">{row.donors}</StyledTableCell>
              <StyledTableCell align="center">{row.receivers}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
