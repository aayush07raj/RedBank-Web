import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../../../Apis/api";
import { TramRounded } from "@material-ui/icons";

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
    id: "requestTime",
    numeric: false,
    label: "Request Time",
    disablePadding: false,
  },
  {
    id: "donationId",
    numeric: false,
    label: "Request Id",
    disablePadding: false,
  },
  {
    id: "bloodGroup",
    numeric: false,
    label: "blood group invited",
    disablePadding: false,
  },
  {
    id: "address",
    numeric: false,
    label: "Selected location",
    disablePadding: false,
  },
  {
    id: "venue",
    numeric: false,
    label: "Venue",
    disablePadding: false,
  },

  {
    id: "donors",
    numeric: false,
    disableSorting: true,
    label: "Invited Donors",
    disablePadding: false,
  },
  {
    id: "status",
    numeric: false,
    label: "Status of Request",
    disableSorting: false,
    disablePadding: false,
  },
  {
    id: "expire",
    numeric: false,
    label: "Expire Request?",
    disableSorting: false,
    disablePadding: false,
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
            align="left"
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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

export default function EnhancedTable() {
  const loggedInState = useSelector((state) => state.loggedIn);
  const [active, setList] = useState([]);
  const [donorsList, setDonors] = useState([]);
  const [donationId, setDonationId] = useState("");

  useEffect(() => {
    api
      .get()
      .fetchDonationRequests({
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        console.log(response);
        // if (response.data.success) {
        setList(response.data);
        // }
      })
      .catch();
  }, [loggedInState]);

  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("requestTime");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleExpire = (donationId) => {
    api
      .put()
      .expireDonationRequest(
        {
          donationId: donationId,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((resp) => {
        const idx = active.findIndex((item) => item.donationId === donationId);
        var updatedList = [...active];
        updatedList[idx].status = false;
        setList(updatedList);
        // if (resp.data.success) {
        //console.log(resp)
        // }
      })
      .catch();
  };

  const handleView = (donationId) => {
    api
      .get()
      .fetchDonationDonorList(donationId, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        if (response.data[0]) {
          setDonationId(donationId);
          setDonors(response.data);
        } else {
          setOpen(TramRounded);
        }
      });
  };

  useEffect(() => {
    if (donorsList.length !== 0) {
      history.push({
        pathname: "/inviteesList",
        donorsList,
        donationId,
        setDonors,
      });
    }
  }, [donorsList]);

  // dialog state
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(active, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell align="left">
                        {row.requestTime.split("T")[0]} at{"   "}
                        {row.requestTime.split("T")[1].split(":")[0]} :
                        {row.requestTime.split("T")[1].split(":")[1]}
                      </TableCell>
                      <TableCell align="left">{row.donationId}</TableCell>
                      <TableCell align="left">
                        {row.bloodGroup ? row.bloodGroup : <p>NA</p>}
                      </TableCell>
                      <TableCell align="left">
                        {row.district}, {row.state}, {row.pincode}
                      </TableCell>
                      <TableCell align="left">{row.address}</TableCell>

                      <TableCell align="left">
                        <Button
                          onClick={(e) => {
                            handleView(row.donationId);
                          }}
                        >
                          View List
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        {row.status ? (
                          <p style={{ fontWeight: "bold", color: "green" }}>
                            Active
                          </p>
                        ) : (
                          <p style={{ fontWeight: "bold", color: "red" }}>
                            Expired
                          </p>
                        )}
                      </TableCell>

                      <TableCell align="left">
                        {row.status ? (
                          <Button
                            type="button"
                            variant="contained"
                            onClick={(e) => {
                              handleExpire(row.donationId);
                            }}
                            style={{
                              backgroundColor: "#E94364",
                              color: "white",
                            }}
                          >
                            Expire
                          </Button>
                        ) : (
                          <p style={{ fontWeight: "bold", color: "red" }}>
                            Expired
                          </p>
                        )}
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
          count={active.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {/* dialog for no list ot be shown */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Not Found"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Sorry, no list to be shown</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}
