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
import { useSelector } from "react-redux";

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
    height: "540px",
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
  const loggedInState = useSelector((state) => state.loggedIn);

  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory/receieveinventory", {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        console.log(response.data);
        setData(response.data);
        // }
      })
      .catch();
  }, []);

  const handleEdit = () => {
    const currPassword = window.prompt("Enter your current password");
    axios
      .post(
        "http://localhost:8080/profile/verifycurrentpassword",
        {
          currentPassword: currPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          window.alert("You can start editing");
          setStatus(false);
        } else {
          window.alert("Wrong password entered");
        }
      })
      .catch();
  };

  const handleSave = () => {
    if (loggedInState.userType === 2) {
      axios
        .put("http://localhost:8080/inventory/updatehosinventory", data, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          // if (response.data.success) {
          console.log(response);
          setData(response.data);
          window.alert("changes successfully saved");
          setStatus(true);
          // }
        })
        .catch();
    } else {
      axios
        .put("http://localhost:8080/inventory/updatebbinventory", data, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          // if (response.data.success) {
          console.log(response);
          setData(response.data);
          window.alert("changes successfully saved");
          setStatus(true);
          // }
        })
        .catch();
    }
  };

  const handleChange = (idx, e) => {
    const { value, name } = e.target;
    const updatedData = [...data];
    updatedData[idx][name] = value;
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
            </ButtonGroup>
          )}
        </ButtonGroup>
      </Grid>

      {loggedInState.userType == 2 ? (
        <TableContainer component={Paper} className={classes.root}>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Component</StyledTableCell>
                <StyledTableCell align="center">Blood Group</StyledTableCell>
                <StyledTableCell align="center">
                  Units available&nbsp;(ltr)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {data.map((row, idx) => (
              <TableBody>
                <TableRow key={idx}>
                  <StyledTableCell align="center" rowspan={8}>
                    {row.component}
                  </StyledTableCell>
                  <StyledTableCell align="center">A-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.aNegUnits
                    ) : (
                      <TextField
                        name="aNegUnits"
                        value={row.aNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">A+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.aPosUnits
                    ) : (
                      <TextField
                        name="aPosUnits"
                        value={row.aPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">AB-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.abNegUnits
                    ) : (
                      <TextField
                        name="abNegUnits"
                        value={row.abNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">AB+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.abPosUnits
                    ) : (
                      <TextField
                        name="abPosUnits"
                        value={row.abPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">B-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.bNegUnits
                    ) : (
                      <TextField
                        name="bNegUnits"
                        value={row.bNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">B+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.bPosUnits
                    ) : (
                      <TextField
                        name="bPosUnits"
                        value={row.bPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">O-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.oNegUnits
                    ) : (
                      <TextField
                        name="oNegUnits"
                        value={row.oNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">O+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.oPosUnits
                    ) : (
                      <TextField
                        name="oPosUnits"
                        value={row.oPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      ) : (
        // for blood bank
        <TableContainer component={Paper} className={classes.root}>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Component</StyledTableCell>
                <StyledTableCell align="center">Blood Group</StyledTableCell>
                <StyledTableCell align="center">
                  Units available&nbsp;(ltr)
                </StyledTableCell>
                <StyledTableCell align="center">
                  Price/unit&nbsp;(Rs)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {data.map((row, idx) => (
              <TableBody>
                <TableRow key={idx}>
                  <StyledTableCell align="center" rowspan={8}>
                    {row.component}
                  </StyledTableCell>
                  <StyledTableCell align="center">A-</StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {readOnly ? (
                      row.aNegUnits
                    ) : (
                      <TextField
                        name="aNegUnits"
                        value={row.aNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {readOnly ? (
                      row.aNegPrice
                    ) : (
                      <TextField
                        name="aNegPrice"
                        value={row.aNegPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">A+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.aPosUnits
                    ) : (
                      <TextField
                        name="aPosUnits"
                        value={row.aPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.aPosPrice
                    ) : (
                      <TextField
                        name="aPosPrice"
                        value={row.aPosPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">AB-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.abNegUnits
                    ) : (
                      <TextField
                        name="abNegUnits"
                        value={row.abNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.abNegPrice
                    ) : (
                      <TextField
                        name="abNegPrice"
                        value={row.abNegPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">AB+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.abPosUnits
                    ) : (
                      <TextField
                        name="abPosUnits"
                        value={row.abPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.abPosPrice
                    ) : (
                      <TextField
                        name="abPosPrice"
                        value={row.abPosPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">B-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.bNegUnits
                    ) : (
                      <TextField
                        name="bNegUnits"
                        value={row.bNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.bNegPrice
                    ) : (
                      <TextField
                        name="bNegPrice"
                        value={row.bNegPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">B+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.bPosUnits
                    ) : (
                      <TextField
                        name="bPosUnits"
                        value={row.bPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.bPosPrice
                    ) : (
                      <TextField
                        name="bPosPrice"
                        value={row.bPosPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">O-</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.oNegUnits
                    ) : (
                      <TextField
                        name="oNegUnits"
                        value={row.oNegUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.oNegPrice
                    ) : (
                      <TextField
                        name="oNegPrice"
                        value={row.oNegPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">O+</StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.oPosUnits
                    ) : (
                      <TextField
                        name="oPosUnits"
                        value={row.oPosUnits}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {readOnly ? (
                      row.oPosPrice
                    ) : (
                      <TextField
                        name="oPosPrice"
                        value={row.oPosPrice}
                        onChange={(e) => {
                          if (regex.test(e.target.value)) {
                            handleChange(idx, e);
                          }
                        }}
                      />
                    )}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      )}
    </>
  );
}
