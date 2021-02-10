import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  ButtonGroup,
  Typography,
  Container,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
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

  const handleEdit = () => {
    window.alert("You can start editing !");
    setEdit(false);
  };

  const handleSave = () => {
    window.alert("Changes have been saved !");
    setEdit(true);
    console.log(values);
  };

  return (
    <>
      <Grid container>
        <Grid container align="center" className={classes.container}>
          <Grid item xs={12} sm={5}>
            <CardMedia
              image="https://avatarfiles.alphacoders.com/164/thumb-164819.png"
              style={{ height: 150, width: 150 }}
              component="img"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardContent>
              <Typography variant="h6">Username : {values.name}</Typography>
              <Typography variant="h6">User Id : #F132GH</Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="secondary" size="small">
                Active Donor
              </Button>
            </CardActions>
          </Grid>
        </Grid>

        <Grid container align="center" className={classes.container}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">
              {" "}
              Donation Made: <span style={{ color: "#e94394" }}> 6</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">
              Commitment Made: <span style={{ color: "blue" }}> 6</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">
              Drive Attended: <span style={{ color: "green" }}> 6</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={8} sm={12} align="center">
          <Typography variant="h4">About</Typography>
        </Grid>

        <Grid container className={classes.container} align="center">
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">Email : {values.email}</Typography>
            <Typography variant="h5">Phone : {values.phone}</Typography>
            <Typography variant="h5">Date of Birth : {values.dob}</Typography>
            <Typography variant="h5">Blood Group : {values.bg}</Typography>
            <Typography variant="h5">Address : {values.address}</Typography>
            <Typography variant="h5">State : {values.state}</Typography>
            <Typography variant="h5">District : {values.disrtict}</Typography>
            <Typography variant="h5">Pincode : {values.pincode}</Typography>
          </Grid>
        </Grid>

        <Grid align="center" item xs={12}>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
            size="small"
          >
            {enableReadOnly ? (
              <Button color="secondary" onClick={handleEdit}>
                Edit profile
              </Button>
            ) : (
              <Button color="secondary" onClick={handleSave}>
                Save Changes
              </Button>
            )}

            <Button>Change your password</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
}
export default ProfileForm;
