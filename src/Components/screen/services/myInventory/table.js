import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core/";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "18px",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 159, 6.0, 6.0, 24, 24),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  },
  root: {
    height: "640px",
    overflow: "auto",
    "& .MuiTextField-root": {
      width: 50,
    },
  },
}));

export default function CustomizedTables() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory")
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setData(response.data.inventoryData);
        }
      })
      .catch();
  }, []);

  console.log(data);

  const classes = useStyles();
  const [status, setStatus] = useState(true);

  const handleEdit = () => {
    window.alert("start editing");
    setStatus(false);
  };
  const handleSave = () => {
    window.alert("changes successfully saved");
    setStatus(true);
  };

  const handleChange = (e, idx, label, type) => {
    const { name, value } = e.target;
    const updatedData = { ...data };

    updatedData[idx][label][type] = value;
    setData(updatedData);

    // if (name === "Bprice") updatedData[idx].blood.price = value;
    // else if (name === "Bunits") updatedData[idx].blood.units = value;
  };
  return (
    <>
      <Grid container justify="flex-end">
        <ButtonGroup
          color="secondary"
          aria-label="outlined secondary button group"
          className={classes.buttonGroup}
          size="large"
        >
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleSave}>Save</Button>
        </ButtonGroup>
      </Grid>

      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Blood Group</StyledTableCell>
              <StyledTableCell align="center" colspan={2}>
                Whole Blood
              </StyledTableCell>
              <StyledTableCell align="center" colspan={2}>
                Plasma
              </StyledTableCell>
              <StyledTableCell align="center" colspan={2}>
                Platelets
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Price/unit</StyledTableCell>
              <StyledTableCell align="center">Units available</StyledTableCell>
              <StyledTableCell align="center">Price/unit</StyledTableCell>
              <StyledTableCell align="center">Units available</StyledTableCell>
              <StyledTableCell align="center">Price/unit</StyledTableCell>
              <StyledTableCell align="center">Units available</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <StyledTableCell align="center">
                  {row.bloodGroup}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={row.blood.price}
                    name="price"
                    onChange={(e) => {
                      handleChange(e, idx);
                    }}
                    inputProps={{ readOnly: status }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={row.blood.units}
                    name="units"
                    onChange={(e) => {
                      handleChange(e, idx, "blood", "units");
                    }}
                    inputProps={{ readOnly: status }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={row.plasma.price}
                    name="price"
                    inputProps={{ readOnly: status }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={row.plasma.units}
                    name="units"
                    inputProps={{ readOnly: status }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={row.platelets.price}
                    name="price"
                    inputProps={{ readOnly: status }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={row.platelets.units}
                    name="units"
                    inputProps={{ readOnly: status }}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}