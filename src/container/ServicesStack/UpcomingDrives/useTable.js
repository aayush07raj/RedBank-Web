import React, { useState } from "react";
import PropTypes from "prop-types";

import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";
import { useSelector } from "react-redux";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Organiser Name",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "time",
    numeric: false,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "contact",
    numeric: false,
    disablePadding: false,
    label: "Contact",
  },
  {
    id: "bloodGroups",
    numeric: false,
    disablePadding: false,
    label: "Invited Blood Groups",
  },
  {
    id: "register",
    numeric: false,
    disablePadding: false,
    label: "Register here",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ fontWeight: "bold" }}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: "theme.palette.secondary.main",
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ list }) {
  var List = [];
  list.map((item) => {
    List.push(item);
  });

  const loggedInState = useSelector((state) => state.loggedIn);
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("contact");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogTitle, setTitle] = useState("");
  const [dialogDescp, setDescp] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRegister = (driveId) => {
    axios
      .post(
        "http://localhost:8080/upcomingdrives/registerfordrive",
        {
          driveId: "DRV01",
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setTitle("Registration Successful");
          setDescp("You have been successfully registered");
          setOpen(true);
        } else {
          setTitle("Registration Failed");
          setDescp("You are already registered");
          setOpen(true);
        }
      })
      .catch((err) => {
        setTitle("Server Error");
        setDescp(err);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} size="medium">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(List, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.driveId}>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        {row.startTimestamp.split("T")[0]} --{" "}
                        {row.endTimestamp.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">
                        {row.startTimestamp.split("T")[1].split(":")[0]} :
                        {row.startTimestamp.split("T")[1].split(":")[1]} --{" "}
                        {row.endTimestamp.split("T")[1].split(":")[0]} :
                        {row.endTimestamp.split("T")[1].split(":")[1]}
                      </TableCell>
                      <TableCell align="center">
                        {row.address}, {row.district}, {row.state},{row.pincode}
                      </TableCell>
                      <TableCell align="center">{row.contact}</TableCell>
                      <TableCell align="center">{row.bloodGroups}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={(e) => handleRegister(row.driveId)}
                          style={{ backgroundColor: "#E94364", color: "white" }}
                        >
                          Register
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={List.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {/* dialog for succesfully registered, already registered */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogDescp}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#E94364", color: "white" }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}