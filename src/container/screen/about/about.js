import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core/";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import axios from "axios";
// import Accordion from "@material-ui/core/Accordion";
import Accordion from "../../../component/faqs";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BloodTable from "./bloodCompatibilityTable";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://elements-cover-images-0.imgix.net/6e855666-1764-4019-be9e-998505bd3fdf?auto=compress&crop=edges&fit=crop&fm=jpeg&h=630&w=1200&s=fffbff5628fab9da0e2697d748790e92')`,
    height: "600px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  form: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    width: "550px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  faq: {
    width: "550px",
  },
}));

function About(props) {
  const [message, addMsg] = useState({
    subject: "",
    message: "",
  });
  const [errors, setError] = useState({
    subject: "",
    message: "",
  });
  const loggedInState = useSelector((state) => state.loggedIn);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...message };
    updatedData[name] = value;
    addMsg(updatedData);
  };

  const validate = () => {
    const errors = {};

    if (message.subject === "") {
      errors.subject = "Subject cannot be empty";
    }
    if (message.message === "") {
      errors.message = "Message cannot be empty";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const errors = validate();
    setError(errors);
    if (errors) return;

    axios
      .post("http://localhost:8080/contactus/addmessage", message, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setOpen(true);
          addMsg({ subject: "", message: "" });
        }
      });
  };

  const user = props.location.user;
  const classes = useStyles();
  // const paperStyle = {
  //   display: "flex",
  //   width: "100%",
  //   flexDirection: "column",
  //   padding: "30px",
  // };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar user={user} />

      <div className="Home">
        <Box className={classes.hero}>
          <Box>About Us</Box>
        </Box>
        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">About our Portal</Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" style={{ padding: "10px" }}>
              "Rakt daan, Mahadaan", You might've heard this slogan a number of
              times in your life, and you even might've thought "Maybe I can
              donate blood too and that way, I'll save a life". At the same
              time, someone in a hospital within your walking distance is in
              urgent need of blood with your blood group the hospital forgot to
              restock that particular blood group. You can save that patient's
              life, but you don't know that the patient exists or is in need of
              blood. The hospital could've restocked the blood, but they didn't
              know they were out of stock. Clearly, there's a gap. We intend to
              bridge that with{" "}
              <p
                style={{
                  fontFamily: "Montserrat-Regular",
                  color: "red",
                  fontSize: "30px",
                }}
              >
                RedBank
              </p>
              . {"\n\n\n"}
              RedBank serves as a Typographylatform to bridge the gap between
              the blood donors and recipients and to reduce the efforts required
              to find the right type of blood group. with redBank , hospitlas
              can easily view and manage their inventory, blood banks can sell
              blood to other users and any user can nake a request to all the
              active donors who are willing to donate their blood to save a
              life.
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Paper className={classes.form} elevation={5}>
              <Typography variant="h5">Feel free to contact us </Typography>
              <TextField
                style={{ marginTop: "10px" }}
                className={classes.formControl}
                label="Subject:"
                type="text"
                onChange={handleChange}
                name="subject"
                value={message.subject}
                variant="outlined"
                inputProps={{ maxLength: 30 }}
                error={errors && errors.subject ? true : false}
                helperText={errors && errors.subject ? errors.subject : null}
              />
              <TextField
                style={{ marginTop: "10px" }}
                className={classes.formControl}
                label="Send a Message"
                multiline
                type="text"
                onChange={handleChange}
                rows={7}
                name="message"
                value={message.message}
                variant="outlined"
                error={errors && errors.message ? true : false}
                helperText={errors && errors.message ? errors.message : null}
              />
              <Button style={{ marginTop: "10px" }} onClick={handleClick}>
                Submit feedback
              </Button>
            </Paper>

            {/* dialog for response */}
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <DialogContentText>
                  Your response has been submitted
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid container className={classes.blogsContainer} justify="center">
            <Grid item xs={12} align="center">
              <Typography variant="h4">FAQS</Typography>
              <Divider />
            </Grid>

            <Grid item xs={6}>
              <Accordion
                title="How does the blood donation process work?"
                descp="Donating blood is a simple thing to do, but can make a big
                      difference in the lives of others. The donation process
                      from the time you arrive until the time you leave takes
                      about an hour. The donation itself is only about 8-10
                      minutes on average."
              />
              <Accordion
                title="Will it hurt when you insert the needle?"
                descp="Only for a moment. Pinch the fleshy, soft underside of
                      your arm. That pinch is similar to what you will feel when
                      the needle is inserted."
              />
              <Accordion
                title=" How long does a blood donation take?"
                descp="The entire process takes about one hour and 15 minutes;
                      the actual donation of a pint of whole blood unit takes
                      eight to 10 minutes. However, the time varies slightly
                      with each person depending on several factors including
                      the donor’s health history and attendance at the blood
                      drive."
              />
              <Accordion
                title="How often can I donate blood?"
                descp="You must wait at least eight weeks (56 days) between
                      donations of whole blood and 16 weeks (112 days) between
                      Power Red donations. Platelet apheresis donors may give
                      every 7 days up to 24 times per year. Regulations are
                      different for those giving blood for themselves
                      (autologous donors)."
              />
              <Accordion
                title="Who can donate blood?"
                descp="In most states, donors must be age 17 or older. Some
                      states allow donation by 16-year-olds with a signed
                      parental consent form. Donors must weigh at least 110
                      pounds and be in good health. Additional eligibility
                      criteria apply."
              />
              <Accordion
                title=" Are guests or kids allowed to come to blood drives or
                      donation centers with a donor?"
                descp="During this coronavirus outbreak, the Red Cross is not
                      allowing guests including children to enter a blood drive
                      or center to ensure we can maintain social distancing as
                      we adhere to new safety precautions."
              />
              <Accordion
                title="How long will it take to replenish the pint of blood I
                      donate?"
                descp="The plasma from your donation is replaced within about 24
                      hours. Red cells need about four to six weeks for complete
                      replacement. That’s why at least eight weeks are required
                      between whole blood donations."
              />
              <Accordion
                title="Why does the Red Cross ask so many personal questions when
                      I give blood?"
                descp="The highest priorities of the Red Cross are the safety of
                      the blood supply and our blood donors. Some individuals
                      may be at risk of transferring communicable disease
                      through blood donation due to exposure via travel or other
                      activities or may encounter problems with blood donation
                      due to their health. We ask these questions to ensure that
                      it is safe for patients to receive your blood and to
                      ensure that it is safe for you to donate blood that day."
              />
              <Accordion
                title="Can donors wear a mask at a blood drive?"
                descp="In accordance with the updated CDC guidelines, beginning
                      April 15, donors will be required to wear face masks at a
                      blood drive or donation center. We encourage donors to
                      bring their own face masks. If a donor does not have a
                      mask, the Red Cross will provide one. If a donor does not
                      want to wear a mask, we ask they postpone their donation
                      for a later date"
              />
              <Accordion
                title="What is plasma?"
                descp="Plasma is the liquid portion of your blood. It helps with
                      clotting and supports immunity. It contains antibodies
                      that fight off infections, so those who have recovered
                      from this new coronavirus will have antibodies in their
                      blood plasma that help protect them against future
                      infections."
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container style={{ height: "150px" }} />
      <Footer />
    </>
  );
}

export default About;
