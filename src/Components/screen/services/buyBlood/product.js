import React from "react";
import { Navbar, Footer } from "../../../layouts/";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position:'fixed',
    width: "100%",

    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(4),
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

const handleClick = () => {
  window.alert(
    "Purchased confirmed. You can check the details in the My Purchases section of your services"
  );
};

// function Product({ iota }) {
const Product = (props) => {
  const { bg, component, units, amount } =
    (props.location && props.location.iota) || {};
  const price = props.location.price;
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">Selected Product</Typography>
        <Divider />
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
            <Paper align="center" square style={{ padding: "50px" }}>
              <Container className={classes.typo}>
                <Typography className={classes.typo} variant="h6">
                  Blood Group: {bg}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Component:{component}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Units Required:{units}
                </Typography>
                <Typography className={classes.typo} variant="h6">
                  Total Amount:{price}
                </Typography>
                <Button
                  className={classes.typo}
                  type="button"
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  Buy
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClosed}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are You Sure?"}
                  </DialogTitle>
                  <DialogContent></DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosed} color="primary">
                      No
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        window.alert(
                          "Your Invoice is updated in My Purchases Page"
                        );
                        handleClosed();
                        history.push("/home");
                      }}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
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
