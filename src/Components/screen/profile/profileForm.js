import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Card, CardActionArea, CardContent, CardActions, CardMedia} from "@material-ui/core";

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
          <Grid container justify="center" spacing={8}>
              <Grid item xs={8} sm={3}>
              <CardMedia image="https://avatarfiles.alphacoders.com/164/thumb-164819.png" style={{ margin: "40px", height:150, width: 150}} component="img"/>
              </Grid>
              <Grid item xs={8} sm={5}>
              <CardContent>
                <Typography style={{padding:"20px"}}variant="h4">
                  Name: {values.name}
                </Typography>
                <Typography variant="h6" style={{ paddingLeft: "20px"}}>
                  
                  User ID: #F132GH
                </Typography>
              </CardContent>
              <CardActions style={{marginLeft:"30px",marginTop:"5px"}} >
                <Button  variant="outlined" color="secondary">
                  Active Donor
                </Button>
              </CardActions>
              </Grid>
            </Grid>
            
            <Grid container justify="center" spacing={8}>
              <Grid item xs={8} sm={2}>
              <Typography> Donation Made: 6</Typography>
              </Grid>
              <Grid item xs={8} sm={2}>
              <Typography>Commitment Made: 4</Typography>
              </Grid>
              <Grid item xs={8} sm={2}>
              <Typography>Drive Attended: 7</Typography>
              </Grid>
            </Grid>

            <Grid container style={{marginTop:"10px"}} justify="center" spacing={4}>
              <Grid align="center" item xs={8} sm={4}>
              <Typography variant="h4">About</Typography>
              <div style={{ marginTop:"20px"}} className={classes.div1}>
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

            <Grid container style={{marginTop:"20px"}} justify="center" spacing={8}>
            <Grid item xs={4} sm={2}>
              <Typography variant="h6"> Email: </Typography>
              <Typography variant="h6"> D.O.B:</Typography>
              <Typography variant="h6"> Address:</Typography>
              <Typography variant="h6"> District:</Typography>
              <Typography variant="h6"> State:</Typography>
              <Typography variant="h6"> Pincode:</Typography>
              <Typography variant="h6"> Phone:</Typography>
              
            </Grid>
            <Grid item xs={4} sm={4}>
                <Typography  variant="h6">{values.email}</Typography>
                <Typography  variant="h6">{values.dob}</Typography>
                <Typography  variant="h6">{values.address}</Typography>
                <Typography  variant="h6">{values.district}</Typography>
                <Typography  variant="h6">{values.state}</Typography>
                <Typography  variant="h6">{values.pincode}</Typography>
                <Typography  variant="h6">{values.phone}</Typography>
            </Grid>
            </Grid>
            <Grid container style={{marginTop:"20px"}} justify="center" spacing={8}>
              <Grid align="center" item xs={8} sm={4}>
              <div className={classes.div1}>
              <Button onClick={handlePasswordChange}>
                change your password ?
              </Button>
            </div>
              </Grid>
            </Grid>
        </Grid>
      </form>
    </>
  );
}
export default ProfileForm;
