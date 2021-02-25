import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  TextField,
  Paper,
  Button,
} from "@material-ui/core/";
import { Navbar, Footer } from "../../layouts";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
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
    marginTop: theme.spacing(5),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
}));

function Home(props) {
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
    } else if (message.message === "") {
      errors.message = "Message cannot be empty";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(message);
    const errors = validate();
    console.log(errors);
    setError(errors);
    if (errors) return;

    // axios
    //   .post("http://localhost:8080/contactus/addmessage", message, {
    //     headers: {
    //       Authorization: "Bearer " + loggedInState.userToken,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data.success) {
    //       console.log(response);
    //       window.alert("Your message has been Submiited!");
    //     }
    //   });
  };

  const user = props.location.user;

  const classes = useStyles();
  const paperStyle = {
    display: "flex",
    width: 580,
    flexDirection: "column",
    padding: "30px",
  };

  return (
    <>
      <Navbar user={user} />

      <div className="Home">
        <Box className={classes.hero}>
          <Box>About Us</Box>
        </Box>
        <Container maxWidth="lg" className={classes.blogsContainer}></Container>
        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Grid container>
            <Grid xs={5}>
              <Card>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum The
                  leap into electronic typesetting, remaining essentially
                  unchanged. It was popularised in the 1960s with the release of
                  Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum
                </Typography>
              </Card>
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={5} container justify="center" alignItems="center">
              <Paper style={paperStyle} elevation={5}>
                <Typography>Contact Us</Typography>
                <TextField
                  style={{ marginTop: "10px" }}
                  className={classes.formControl}
                  label="Subject:"
                  type="text"
                  onChange={handleChange}
                  name="subject"
                  value={message.subject}
                  variant="outlined"
                  inputProps={{ maxLength: 20 }}
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
                  Submit
                </Button>
              </Paper>
            </Grid>
            <Grid
              container
              className={classes.blogsContainer}
              justify="center"
              spacing={8}
            >
              <Grid item xs={12} align="center">
                <Typography variant="h4">Learn more about donation</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ padding: "20px" }}
                >
                  Blood Compatibility Table
                </Typography>
                <BloodTable />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ padding: "20px" }}
                >
                  FAQs
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      How does the blood donation process work?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Donating blood is a simple thing to do, but can make a big
                      difference in the lives of others. The donation process
                      from the time you arrive until the time you leave takes
                      about an hour. The donation itself is only about 8-10
                      minutes on average.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      Will it hurt when you insert the needle?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Only for a moment. Pinch the fleshy, soft underside of
                      your arm. That pinch is similar to what you will feel when
                      the needle is inserted.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      How long does a blood donation take?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The entire process takes about one hour and 15 minutes;
                      the actual donation of a pint of whole blood unit takes
                      eight to 10 minutes. However, the time varies slightly
                      with each person depending on several factors including
                      the donor’s health history and attendance at the blood
                      drive.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>How often can I donate blood?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      You must wait at least eight weeks (56 days) between
                      donations of whole blood and 16 weeks (112 days) between
                      Power Red donations. Platelet apheresis donors may give
                      every 7 days up to 24 times per year. Regulations are
                      different for those giving blood for themselves
                      (autologous donors).
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Who can donate blood?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      In most states, donors must be age 17 or older. Some
                      states allow donation by 16-year-olds with a signed
                      parental consent form. Donors must weigh at least 110
                      pounds and be in good health. Additional eligibility
                      criteria apply.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      Are guests or kids allowed to come to blood drives or
                      donation centers with a donor?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      During this coronavirus outbreak, the Red Cross is not
                      allowing guests including children to enter a blood drive
                      or center to ensure we can maintain social distancing as
                      we adhere to new safety precautions.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      How long will it take to replenish the pint of blood I
                      donate?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The plasma from your donation is replaced within about 24
                      hours. Red cells need about four to six weeks for complete
                      replacement. That’s why at least eight weeks are required
                      between whole blood donations.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      Why does the Red Cross ask so many personal questions when
                      I give blood?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The highest priorities of the Red Cross are the safety of
                      the blood supply and our blood donors. Some individuals
                      may be at risk of transferring communicable disease
                      through blood donation due to exposure via travel or other
                      activities or may encounter problems with blood donation
                      due to their health. We ask these questions to ensure that
                      it is safe for patients to receive your blood and to
                      ensure that it is safe for you to donate blood that day.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      Can donors wear a mask at a blood drive?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      In accordance with the updated CDC guidelines, beginning
                      April 15, donors will be required to wear face masks at a
                      blood drive or donation center. We encourage donors to
                      bring their own face masks. If a donor does not have a
                      mask, the Red Cross will provide one. If a donor does not
                      want to wear a mask, we ask they postpone their donation
                      for a later date
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>What is plasma?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Plasma is the liquid portion of your blood. It helps with
                      clotting and supports immunity. It contains antibodies
                      that fight off infections, so those who have recovered
                      from this new coronavirus will have antibodies in their
                      blood plasma that help protect them against future
                      infections.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Home;
