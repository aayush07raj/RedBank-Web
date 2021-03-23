import React from "react";
import PropTypes from "prop-types";

import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { Button } from "@material-ui/core/";
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

import { Link, useHistory } from "react-router-dom";

function createData(name, date, bg, component, units, contact, amount) {
  return { name, date, bg, component, units, contact, amount };
}

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
    id: "dateOfTransaction",
    numeric: true,
    disablePadding: false,
    label: "Date of purchase",
  },
  {
    id: "purchaseId",
    numeric: false,
    disablePadding: false,
    label: "Purchase Id",
  },
  {
    id: "soldComponent",
    numeric: false,
    disablePadding: false,
    label: "Component purchased",
  },
  {
    id: "soldGroup",
    numeric: false,
    disablePadding: false,
    label: "Blood Group purchased",
  },
  {
    id: "pricePerUnit",
    numeric: false,
    disablePadding: false,
    label: "Price/Unit",
  },
  {
    id: "soldQuantity",
    numeric: true,
    disablePadding: false,
    label: "Units purchased",
  },
  {
    id: "sellerDetails",
    numeric: false,
    disablePadding: false,
    label: "Seller Details",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount Paid (Rs)",
  },
  {
    id: "reason",
    numeric: false,
    disablePadding: false,
    label: "Reason for purchase",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location of usage",
  },

  {
    id: "invoice",
    numeric: false,
    disablePadding: false,
    label: "Invoice",
  },
];

const useHeaderStyles = makeStyles((theme) => ({
  head: {
    fontSize: 17,
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
            align="center"
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
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
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

  const history = useHistory();

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const handleInvoice = (Details) => {
    history.push({
      pathname: "/MyPurchases/Invoice",
      Details,
    });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, List.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
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
                      <TableCell align="center">
                        {row.dateOfTransaction.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{row.purchaseId}</TableCell>
                      <TableCell align="center">{row.soldComponent}</TableCell>
                      <TableCell align="center">{row.soldGroup}</TableCell>
                      <TableCell align="center">{row.pricePerUnit}</TableCell>
                      <TableCell align="center">{row.soldQuantity}</TableCell>
                      <TableCell align="center">
                        {row.sellerName} ,{row.sellerContact},{row.sellerEmail}
                      </TableCell>
                      <TableCell align="center">
                        {row.pricePerUnit * row.soldQuantity}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {row.reason ? row.reason : <>N/A</>}
                      </TableCell>
                      <TableCell align="center">
                        {row.location ? row.location : <>N/A</>}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          onClick={(event) => {
                            handleInvoice(List[index]);
                          }}
                        >
                          View Invoice
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={List.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
