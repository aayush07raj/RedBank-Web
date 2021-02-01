import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core/";

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  },
  root: {
    height: "580px",
    overflow: "auto",
    "& .MuiTextField-root": {
      width: 50,
    },
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [status, setStatus] = useState(true);

  const handleEdit = () => {
    setStatus(false);
  };
  const handleSave = () => {
    setStatus(true);
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
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Component</StyledTableCell>
              <StyledTableCell align="center">Blood Group</StyledTableCell>
              <StyledTableCell align="center">Price/Unit</StyledTableCell>
              <StyledTableCell align="center">Units available</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell
                component="th"
                scope="row"
                rowspan={8}
                align="center"
              >
                Whole Blood
              </StyledTableCell>
              <StyledTableCell align="center">A+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">A-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">B+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">B-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">O+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">O-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField value="1000" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">AB+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField value="1000" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">AB-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell
                component="th"
                scope="row"
                rowspan={8}
                align="center"
              >
                Plasma
              </StyledTableCell>
              <StyledTableCell align="center">A+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">A-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">B+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">B-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">O+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">O-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField value="1000" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">AB+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField value="1000" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">AB-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell
                component="th"
                scope="row"
                rowspan={8}
                align="center"
              >
                Platelets
              </StyledTableCell>
              <StyledTableCell align="center">A+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">A-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">B+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">B-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">O+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">O-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField value="1000" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">AB+</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField value="1000" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">AB-</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  value="1000"
                  inputProps={{
                    readOnly: status,
                  }}
                />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}