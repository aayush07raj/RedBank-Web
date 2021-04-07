import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Container, Grid, Typography } from "@material-ui/core";
import { Modal, TextField } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useSelector } from "react-redux";
import api from "../../../Apis/api";
import empty from "../../../assets/images/empty.png";

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
    id: "inviteTimestamp",
    label: "Invite made on",
  },
  {
    id: "inviteType",
    label: "Invite type",
  },
  {
    id: "inviteId",
    label: "Id",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "time",
    label: "Time",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "inviterDetails",
    label: "Inviter details",
  },
  {
    id: "accept",
    label: "Status",
  },
];

const useHeaderStyles = makeStyles((theme) => ({
  head: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}));

function EnhancedTableHead(props) {
  const headerClasses = useHeaderStyles();
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
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
            className={headerClasses.head}
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(3),
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
  imageBreakpoint: {
    height: "400px",
    width: "400px",
    [theme.breakpoints.down("xs")]: {
      width: 300,
      height: 300,
    },
  },
  headingTop: {
    marginBottom: theme.spacing(2),
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("inviteType");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [Message, setRejectionMessage] = useState("");
  const loggedInState = useSelector((state) => state.loggedIn);
  const [List, setList] = useState([]);
  const [acceptance, setAcceptance] = useState(false);
  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");

  useEffect(() => {
    api
      .get()
      .fetchInvites({
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

  const handleAccept = (index) => {
    // axios call

    if (List[index].inviteType === "drive") {
      api
        .put()
        .setInviteStatus(
          {
            eventId: List[index].driveId,
            eventType: List[index].inviteType,
            acceptance: 1,
            rejectionMesaage: "",
          },
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          // if (response.data.success) {
          setAcceptance(1);
          setTitle("Invite accepted");
          setDescp("Check My Activity section for regular updates");
          setOpen(true);
          setList((prevList) => {
            const newList = [...prevList];
            newList[index].status = 1;
            return newList;
          });
          // }
        })
        .catch();
    } else {
      api
        .put()
        .setInviteStatus(
          {
            eventId: List[index].donationId,
            eventType: List[index].inviteType,
            acceptance: 1,
            rejectionMesaage: "",
          },
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          // if (response.data.success) {
          setAcceptance(1);
          setTitle("Invite accepted");
          setDescp("Check My Activity section for regular updates");
          setOpen(true);
          setList((prevList) => {
            const newList = [...prevList];
            newList[index].status = 1;
            return newList;
          });
          // }
        })
        .catch();
    }
  };

  const [index, setIndex] = useState(0);

  const handleReject = () => {
    setAcceptance(false);
    setTitle("Are you sure");
    setDescp("Please enter your reason of rejection");
    setOpen(true);
    // axios call
    if (List[index].inviteType === "drive") {
      api
        .put()
        .setInviteStatus(
          {
            eventId: List[index].driveId,
            eventType: List[index].inviteType,
            acceptance: 0,
            rejectionMesaage: Message,
          },
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          // if (response.data.success) {
          setOpen(false);
          setRejectionMessage("");
          setList((prevList) => {
            const newList = [...prevList];
            newList[index].status = 0;
            return newList;
          });
          // }
        })
        .catch();
    } else {
      api
        .put()
        .setInviteStatus(
          {
            eventId: List[index].donationId,
            eventType: List[index].inviteType,
            acceptance: 0,
            rejectionMesaage: Message,
          },
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          // if (response.data.success) {
          setOpen(false);
          setRejectionMessage("");
          setList((prevList) => {
            const newList = [...prevList];
            newList[index].status = 0;
            return newList;
          });
          // }
        })
        .catch();
    }
  };

  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setRejectionMessage("");
    setOpen(false);
  };

  return (
    <>
      {List.length > 0 ? (
        <div>
          <Paper elevation={4}>
            <TableContainer className={classes.root}>
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
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell align="left">
                            {row.inviteTimestamp.split("T")[0]}
                          </TableCell>
                          <TableCell id={index} align="left">
                            {row.inviteType === "donation" ? (
                              row.recipientType === "Individual" ? (
                                <>Individual</>
                              ) : row.recipientType === "Hospital" ? (
                                <>Hospital</>
                              ) : (
                                <>BloodBank </>
                              )
                            ) : (
                              <>Drive</>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {row.inviteType === "drive"
                              ? row.driveId
                              : row.donationId}
                          </TableCell>

                          <TableCell align="left">
                            {row.inviteType === "drive" ? (
                              <p>
                                {row.startTimestamp.split("T")[0]} to{" "}
                                {row.endTimestamp.split("T")[0]}
                              </p>
                            ) : (
                              <p>N/A</p>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {row.inviteType === "drive" ? (
                              <p>
                                {row.startTimestamp.split("T")[1].split(":")[0]}{" "}
                                :
                                {row.startTimestamp.split("T")[1].split(":")[1]}{" "}
                                to{" "}
                                {row.endTimestamp.split("T")[1].split(":")[0]} :
                                {row.endTimestamp.split("T")[1].split(":")[1]}
                              </p>
                            ) : (
                              <p>N/A</p>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {row.inviteType === "drive" ? (
                              <>
                                {row.address}, {row.district}, {row.state},{" "}
                                {row.pincode}
                              </>
                            ) : (
                              row.address
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {row.recipientName}, {row.recipientContact},{" "}
                            {row.recipientEmail}
                          </TableCell>
                          <TableCell align="left">
                            {List[index].status !== 2 ? (
                              List[index].status === 1 ? (
                                <p>Accepted</p>
                              ) : List[index].status === 0 ? (
                                <p>Rejected</p>
                              ) : null
                            ) : (
                              <ButtonGroup variant="text">
                                <Button
                                  type="button"
                                  variant="contained"
                                  onClick={(e) => handleAccept(index)}
                                  style={{
                                    backgroundColor: "#E94364",
                                    color: "white",
                                  }}
                                  disabled={
                                    loggedInState.donorStatus === 2
                                      ? true
                                      : false
                                  }
                                >
                                  Accept
                                </Button>
                                <Button
                                  type="button"
                                  variant="contained"
                                  onClick={(e) => {
                                    setIndex(index);
                                    setOpen(true);
                                  }}
                                >
                                  Ignore
                                </Button>
                              </ButtonGroup>
                            )}
                          </TableCell>
                          <TableCell align="left"></TableCell>
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

            {/* dialog for accepted or rejected */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{title}</DialogTitle>
              <DialogContent>
                <DialogContentText>{descp}</DialogContentText>
                {acceptance === false ? (
                  <TextField
                    name="Message"
                    value={Message}
                    onChange={(e) => {
                      setRejectionMessage(e.target.value);
                    }}
                    margin="dense"
                    label="type Message"
                    type="text"
                    fullWidth
                  />
                ) : null}
              </DialogContent>
              <DialogActions>
                {acceptance === false ? (
                  <>
                    <Button onClick={handleReject} color="primary">
                      Submit
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Ok
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleClose} color="primary">
                    Ok
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </Paper>
          <Container style={{ height: "250px" }}></Container>
        </div>
      ) : (
        <Grid container justify="center">
          <Grid item>
            <img src={empty} className={classes.imageBreakpoint} />
            <Typography
              align="center"
              variant="h4"
              className={classes.headingTop}
            >
              Not yet
            </Typography>
            <Typography
              align="center"
              variant="h4"
              className={classes.headingTop}
            >
              Check later, someone might need you
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
