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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: "18px",
    fontWeight: "bold",
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  },
  root: {
    height: "630px",
    overflow: "auto",
    "& .MuiTextField-root": {
      width: 50,
    },
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [readOnly, setStatus] = useState(true);
  const [data, setData] = useState([]);
  const regex = /^[0-9]*$/;

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory")
      .then((response) => {
        if (response.data.success) {
          setData(response.data.inventoryData);
        }
      })
      .catch();
  }, []);

  console.log(data);

  const handleEdit = () => {
    window.alert("start editing");
    setStatus(false);
  };
  const handleSave = () => {
    window.alert("changes successfully saved");
    setStatus(true);
  };

  const handleChange = (e, idx, idx2, type) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[idx].data[idx2][type] = value;
    setData(updatedData);
  };

  return (
    <>
      <Grid container justify="flex-end">
        <ButtonGroup color="secondary" className={classes.buttonGroup}>
          {readOnly ? (
            <Button onClick={handleEdit}>Edit</Button>
          ) : (
            <ButtonGroup color="secondary">
              <Button onClick={handleSave}>Save</Button>
              <Button>Cancel</Button>
            </ButtonGroup>
          )}
        </ButtonGroup>
      </Grid>

      <TableContainer component={Paper} className={classes.root}>
        {data.map((item, idx) => (
          <Table className={classes.table}>
            <TableHead>
              <TableRow key={idx}>
                <StyledTableCell align="center" colspan={3}>
                  {item.comp}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Blood Group</StyledTableCell>
                <StyledTableCell align="center">
                  Units Available (Ltr)
                </StyledTableCell>
                <StyledTableCell align="center">Price (Rs)</StyledTableCell>
              </TableRow>
            </TableHead>

            {item.data.map((val, idx2) => (
              <TableBody>
                <TableRow key={idx2}>
                  <StyledTableCell align="center">{val.group}</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      val.units
                    ) : (
                      <TextField
                        name={`units${idx2}`}
                        value={val.units}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(e, idx, idx2, "units");
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      val.price
                    ) : (
                      <TextField
                        name="price"
                        value={val.price}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(e, idx, idx2, "price");
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        ))}
      </TableContainer>
    </>
  );
}
