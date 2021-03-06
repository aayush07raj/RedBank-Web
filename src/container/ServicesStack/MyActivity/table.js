import React from "react";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
    id: "commitmentDate",
    label: "Date and Time",
  },
  {
    id: "commitmentType",
    label: "Activity type",
  },
  {
    id: "driveId",
    label: "Event Id",
  },
  {
    id: "address",
    label: "Event Address",
  },
  {
    id: "recipientName",
    label: "Recipient",
  },
  {
    id: "recipientContact",
    label: "Recipient Details",
  },

  {
    id: "from",
    label: "From",
  },
  {
    id: "to",
    label: "To",
  },
  {
    id: "completed",
    label: "status",
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
}));

export default function EnhancedTable({ list }) {
  var List = [];
  list.map((item) => {
    List.push(item);
  });

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Id");
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

  return (
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
                  <TableRow hover tabIndex={-1} key={row.Id}>
                    <TableCell align="left">
                      {row.commitmentType === "donation"
                        ? row.commitment_timeStamp.split("T")[0]
                        : row.dateTime.split("T")[0]}
                    </TableCell>
                    <TableCell id={index} align="left">
                      {row.commitmentType === "donation" ? (
                        row.recipientType === "individual" ? (
                          <>Individual donation</>
                        ) : row.recipientType === "hospital" ? (
                          <>Hospital donation</>
                        ) : (
                          <>BloodBank donation</>
                        )
                      ) : (
                        <>Drive</>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {row.commitmentType === "donation"
                        ? row.donationId
                        : row.driveId}
                    </TableCell>
                    <TableCell align="left">{row.recipientAddress}</TableCell>
                    <TableCell align="left">{row.recipientName}</TableCell>
                    <TableCell align="left">
                      {row.recipientContact}, {row.recipientEmail}
                    </TableCell>

                    <TableCell align="left">
                      {row.commitmentType === "donation" ? (
                        <p>N/A</p>
                      ) : (
                        <p>
                          {row.startTimeStamp.split("T")[0]},{" "}
                          {row.startTimeStamp.split("T")[1].split(":")[0]}:{" "}
                          {row.startTimeStamp.split("T")[1].split(":")[1]}{" "}
                        </p>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {row.commitmentType === "donation" ? (
                        <p>N/A</p>
                      ) : (
                        <p>
                          {row.endTimeStamp.split("T")[0]},{" "}
                          {row.endTimeStamp.split("T")[1].split(":")[0]}:{" "}
                          {row.endTimeStamp.split("T")[1].split(":")[1]}{" "}
                        </p>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {row.status ? (
                        <p style={{ fontWeight: "bold", color: "green" }}>
                          Complete
                        </p>
                      ) : (
                        <p style={{ fontWeight: "bold", color: "red" }}>
                          Awaiting
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
        count={List.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
