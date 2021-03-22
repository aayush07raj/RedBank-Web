import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core/";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../../Apis/api";

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
  const [currPassword, setCurrPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorTitle, setErrorTitle] = useState("");

  const handleChange = (idx, e) => {
    const { value, name } = e.target;
    const updatedData = [...data];
    updatedData[idx][name] = value;
    setData(updatedData);
  };

  useEffect(() => {
    api
      .get()
      .receiveInventory({
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        // if (response.data.success) {
        setData(response.data);
        // }
      })
      .catch();
  }, []);

  const handleEdit = () => {
    setOpen(false);
    api
      .post()
      .verifyCurrPassword(
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
        if (response.data.success) {
          setCurrPassword("");
          setStatus(false);
          setErrorTitle("Start Editing");
          setErrorMsg("You can start editing");
          setOpen2(true);
        } else {
          setErrorTitle("Wrong password");
          setErrorMsg("Please enter the correct password.");
          setOpen2(true);
        }
      })
      .catch();
  };

  const handleSave = () => {
    if (loggedInState.userType === 2) {
      api
        .put()
        .updateHosInventory(data, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          // if (response.data.success) {
          setData(response.data);
          setStatus(true);
          setErrorTitle("Changes saved");
          setErrorMsg("Changes saved successfully.");
          setOpen2(true);
          // }
        })
        .catch();
    } else {
      api
        .put()
        .updateBbInventory(data, {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          // if (response.data.success) {
          setData(response.data);
          setStatus(true);
          setErrorTitle("Changes saved");
          setErrorMsg("Changes saved successfully.");
          setOpen2(true);
          // }
        })
        .catch();
    }
  };

  // dialog for verifying current password
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setCurrPassword("");
    setOpen(false);
  };

  // dialog for worng current password
  const [open2, setOpen2] = React.useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <>
      <Grid container justify="flex-end">
        <ButtonGroup className={classes.buttonGroup} variant="contained">
          {readOnly ? (
            <Button
              onClick={() => setOpen(true)}
              style={{ backgroundColor: "#E94364", color: "white" }}
            >
              Edit
            </Button>
          ) : (
            <ButtonGroup>
              <Button
                onClick={handleSave}
                style={{ backgroundColor: "#E94364", color: "white" }}
              >
                Save
              </Button>
            </ButtonGroup>
          )}
        </ButtonGroup>
      </Grid>

      {/* dialog for verifying current password */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Verify current password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For security reasons, please enter your current password
          </DialogContentText>
          <TextField
            margin="dense"
            label="Current password"
            type="password"
            name="currPassword"
            value={currPassword}
            onChange={(e) => {
              setCurrPassword(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for wrong password, edit , save changes */}
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>{errorTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary" autoFocus>
            Got it
          </Button>
        </DialogActions>
      </Dialog>

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
