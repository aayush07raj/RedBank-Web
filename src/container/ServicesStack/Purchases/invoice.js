import React, { useRef } from "react";
import Navbar from "../../../component/navbar";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Footer from "../../../component/footer";
import { useStyles } from "../../ServicesStack/serviceCSS";
import PageHeader from "../../../component/pageHeader";
import ReactToPrint from "react-to-print";
import Logo from "../../../assets/images/logo.svg";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <>
        <Container style={{ width: "80%" }}>
          <Grid container align="center" className={this.props.classes.typo}>
            <Grid item xs={12} className={this.props.classes.typo}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/redbank-104.appspot.com/o/logotransparentbkg.png?alt=media&token=7a6f228c-0998-4f81-bd25-519cced6e13f"
                height="90px"
                width="90px"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ color: "#e94364" }} variant="h4">
                RedBank
              </Typography>
            </Grid>
            <Grid item xs={12} className={this.props.classes.invoiceHeading}>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Blood Transaction Invoice
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                Transaction Id: {this.props.Details.purchaseId}
              </Typography>
            </Grid>
          </Grid>

          <Grid container className={this.props.classes.typo}>
            <Grid item xs={12} className={this.props.classes.typo}>
              <Typography
                variant="h5"
                style={{ color: "#e94364", fontWeight: "bold" }}
              >
                Seller details{" "}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Seller Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.sellerName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Seller contact
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.sellerContact}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Seller email
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.sellerEmail}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={this.props.classes.typo}>
            <Grid item xs={12} className={this.props.classes.typo}>
              <Typography
                variant="h5"
                style={{ color: "#e94364", fontWeight: "bold" }}
              >
                Transaction details{" "}
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Date of Transaction
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.dateOfTransaction.split("T")[0]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Blood group
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.soldGroup}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Component
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.soldComponent}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Purpose of purchase
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.reason ? (
                      this.props.Details.reason
                    ) : (
                      <>N/A</>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Location of transfusion/storage
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.location ? (
                      this.props.Details.location
                    ) : (
                      <>N/A</>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Total units bought
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.soldQuantity}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography className={this.props.classes.typo} variant="h6">
                Price per unit
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography className={this.props.classes.typo} variant="h6">
                    {this.props.Details.pricePerUnit}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              container
              justify="center"
              style={{
                border: "2px solid black",
                padding: "10px",
                marginTop: "15px",
              }}
            >
              <Typography className={this.props.classes.typo} variant="h6">
                <span style={{ color: "#e94364", fontWeight: "bold" }}>
                  Total bill amount :
                </span>{" "}
                ₹
                {this.props.Details.pricePerUnit *
                  this.props.Details.soldQuantity}{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography className={[this.props.classes.note]} variant="body2">
                Important note : Booked blood must be collected within 24 hrs
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

const Invoice = (props) => {
  const { Details } = props.location;
  const componentRef = useRef();
  const classes = useStyles();
  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table2}>
          <Paper>
            <ComponentToPrint
              ref={componentRef}
              Details={Details}
              classes={classes}
            />
          </Paper>
          <Grid item>
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  className={[classes.button]}
                  style={{ marginLeft: "50px" }}
                >
                  Generate Invoice
                </Button>
              )}
              content={() => componentRef.current}
            />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Invoice;
