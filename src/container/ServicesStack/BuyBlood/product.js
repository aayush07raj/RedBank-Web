import React from "react";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  Divider,
  Backdrop,
  DialogContentText,
  CircularProgress,
  DialogContent,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Link, useHistory } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../../Apis/api";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";

const Product = (props) => {
  const {
    bg,
    bbName,
    address,
    component,
    price,
    units,
    bbId,
    location,
    reason,
  } = props.location;
  const history = useHistory();
  const loggedInState = useSelector((state) => state.loggedIn);

  // state for are you sure dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  // state for confirmation dialog
  const [open2, setOpen2] = React.useState(false);

  const handleClosed2 = () => {
    setOpen2(false);
    history.push("/home");
  };

  const handleSubmit = () => {
    setOpen(false);
    setIndicatorOpen(true);

    api
      .post()
      .confirmTransaction(
        {
          sellerId: bbId,
          bloodGroup: bg,
          component: component,
          units: units,
          location: location,
          reason: reason,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setIndicatorOpen(false);
          setOpen2(true);
        }
      })
      .catch();
  };

  const [indicatorOpen, setIndicatorOpen] = React.useState(false);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <PageHeader
        title="Selected Product "
        subtitle="Details about the selected product, press Buy button to confirm your
        order"
      />
      <Container maxWidth="md">
        <Grid
          container
          alignContent="center"
          justify="center"
          className={classes.table2}
        >
          <Paper style={{ padding: "20px" }}>
            <Typography
              align="center"
              style={{ fontWeight: "bold" }}
              className={classes.typo}
              variant="h5"
            >
              Confirm your Purchase
            </Typography>
            <Divider />
            <Container className={classes.typo}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Blood Group selected
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Grid>
                    <Typography className={classes.typo} variant="h6">
                      {bg}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Component selected
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Grid>
                    <Typography className={classes.typo} variant="h6">
                      {component}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Units booked
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Grid>
                    <Typography className={classes.typo} variant="h6">
                      {units}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Seller name
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Grid item>
                    <Typography className={classes.typo} variant="h6">
                      {bbName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Seller address
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Grid item>
                    <Typography className={classes.typo} variant="h6">
                      {address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.typo} variant="h6">
                    Total amount :
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Grid item>
                    <Typography className={classes.typo} variant="h6">
                      {price * units} INR
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <Typography className={[classes.note]} variant="body2">
                    Important note :
                  </Typography>
                  <Typography className={[classes.note]} variant="body2">
                    1. Booked blood must be collected within 24 hrs
                  </Typography>
                  <Typography className={[classes.note]} variant="body2">
                    2. Bring your Identity card for your verification along with
                    other necessary documents, when you come for the
                    transfusion.
                  </Typography>
                </Grid>
                <Grid align="center" item xs={12}>
                  <Button
                    className={[classes.button, classes.typo]}
                    type="button"
                    onClick={handleClickOpen}
                    variant="contained"
                  >
                    Proceed to buy
                  </Button>
                </Grid>
              </Grid>

              {/* Are you sure dialog */}
              <Dialog open={open} onClose={handleClosed}>
                <DialogTitle>Confirm Purchase</DialogTitle>
                <DialogContent dividers>
                  <DialogContentText>
                    Are you sure you want to proceed ? You will not be able to
                    cancel the transaction after this.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit} className={classes.confirmBtn}>
                    Yes
                  </Button>
                  <Button onClick={handleClosed} className={classes.confirmBtn}>
                    No
                  </Button>
                </DialogActions>
              </Dialog>

              {/* confirmation box */}
              <Dialog open={open2} onClose={handleClosed2}>
                <DialogTitle>{"Transaction Successful"}</DialogTitle>
                <DialogContent dividers>
                  <DialogContentText>
                    Check 'My Purchases' section for more info about the
                    transaction
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClosed2}
                    className={classes.confirmBtn}
                  >
                    Ok
                  </Button>
                  <Button
                    component={Link}
                    className={classes.confirmBtn}
                    to="/MyPurchases"
                  >
                    Go to My Purhcases
                  </Button>
                </DialogActions>
              </Dialog>

              {/* indicator for please wait */}
              <Backdrop className={classes.backdrop} open={indicatorOpen}>
                <CircularProgress
                  style={{ color: "#E94364", marginRight: "10px" }}
                />
                <Typography variant="h5">Please wait</Typography>
              </Backdrop>
            </Container>
          </Paper>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Product;
