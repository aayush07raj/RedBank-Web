import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  div1: {
    margin: theme.spacing(1),
  },
}));

const initialValues = {
  name: "Aditya Tomar",
  email: "adityatomar765@gmail.com",
  phone: "812736191",
  bg: "B+",
  dob: "06-09-1998",
  address: "79/3-A, address line 1",
  state: "Uttarakhand",
  district: "Dehradun",
  pincode: "248001",
  password: "aditya",
};

function ProfileForm() {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [enableReadOnly, setEdit] = useState(true);

  const [open, setOpen] = React.useState(false);
  const [inputPassword, setPassword] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleEdit = () => {
    window.alert("You can start editing !");
    setEdit(false);
  };

  const handleSave = () => {
    window.alert("Changes have been saved !");
    setEdit(true);
    console.log(values);
  };

  const handlePasswordChange = () => {
    var currPassword = window.prompt("Please enter current Password :");

    if (currPassword === values.password) {
      handleClickOpen();
    } else {
      window.alert("wrong password");
    }
  };

  const handleInputPassword = (e) => {
    setPassword(e.taget.value);
  };
  return (
    <>
      <form className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Full name"
              name="name"
              value={values.name}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
            
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              InputProps={{
                readOnly: enableReadOnly,
              }}
            />
             
            <TextField
              variant="outlined"
              label="State"
              name="state"
              value={values.state}
              onChange={handleChange}
              InputProps={{
                readOnly: enableReadOnly,
              }}
            />
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              InputProps={{
                readOnly: true,
              }}
            />
            <div className={classes.div1}>
              <Button onClick={handlePasswordChange}>
                change your password ?
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Phone number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              type="number"
              InputProps={{
                readOnly: enableReadOnly,
              }}
            />
            <TextField
              variant="outlined"
              label="Blood Group"
              name="Blood Group"
              value={values.bg}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              label="District"
              name="district"
              value={values.district}
              onChange={handleChange}
              InputProps={{
                readOnly: enableReadOnly,
              }}
            />
            <TextField
              variant="outlined"
              label="Pincode"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              type="number"
              InputProps={{
                readOnly: enableReadOnly,
              }}
            />
            <div className={classes.div1}>
              <ButtonGroup
                variant="contained"
                aria-label="contained primary button group"
              >
                <Button color="secondary" onClick={handleEdit}>
                  Edit
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </ButtonGroup>
            </div>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Reset Password"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="enter new password"
                  value={inputPassword}
                  onchange={handleInputPassword}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Change
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
export default ProfileForm;
