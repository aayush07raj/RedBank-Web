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
  CircularProgress,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../../Apis/api";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    width: "100%",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(2),
  },
  typo: {
    fontWeight: "bold",
    padding: "10px",
  },
  table: {
    margin: theme.spacing(10),
    width: "80%",
  },
}));

// function Product({ iota }) {
const Product = (props) => {
  const { bg, bbName, component, price, units, bbId } = props.location;
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
          customerId: loggedInState.userId,
          sellerId: bbId,
          date: new Date().toISOString(),
          bloodGroup: bg,
          component: component,
          price: price,
          units: units,
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
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">Selected Product</Typography>
        <Typography variant="h6" style={{}}>
          Details about the selected product, press Buy button to confirm your
          order
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid
          container
          alignContent="center"
          justify="center"
          className={classes.table}
        >
          <Grid item xs={12} style={{}}>
            <Paper align="center" square style={{ padding: "20px" }}>
              <Typography className={classes.typo} variant="h4">
                Confirm your Purchase
              </Typography>
              <Divider />
              <Container className={classes.typo}>
                <Grid container>
                  <Grid align="center" item md={12}>
                    <Typography className={classes.typo} variant="h6">
                      Seller Name : {bbName}
                    </Typography>
                    <Typography className={classes.typo} variant="h6">
                      Blood Group : {bg}
                    </Typography>
                    <Typography className={classes.typo} variant="h6">
                      Component :{component}
                    </Typography>
                    <Typography className={classes.typo} variant="h6">
                      Units Required :{units}
                    </Typography>
                    <Typography className={classes.typo} variant="h6">
                      Total Amount to be paid :{price * units}
                    </Typography>
                  </Grid>
                </Grid>

                <Button
                  className={classes.typo}
                  type="button"
                  onClick={handleClickOpen}
                  variant="contained"
                  style={{ backgroundColor: "#E94364", color: "white" }}
                >
                  Buy
                </Button>
                {/* Are you sure dialog */}
                <Dialog open={open} onClose={handleClosed}>
                  <DialogTitle>{"Are You Sure?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClosed}>No</Button>
                    <Button onClick={handleSubmit}>Yes</Button>
                  </DialogActions>
                </Dialog>

                {/* confirmation box */}
                <Dialog open={open2} onClose={handleClosed2}>
                  <DialogTitle>
                    {
                      "Transaction successful. Check 'My Purchases' section for more info about the transaction"
                    }
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClosed2}>Ok</Button>
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
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Product;
