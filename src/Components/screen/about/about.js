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
    msg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...message };
    updatedData[name] = value;
    addMsg(updatedData);
    console.log(message.subject);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/contact", {
        message,
      })
      .then((response) => {
        if (response.data.success) {
          window.alert("Your message has been Submiited!");
        }
      });
  };

  const user = props.location.user;
  console.log(user);
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
                {/* <Card> */}
                <Typography>Contact Us</Typography>
                <TextField
                  style={{ marginTop: "10px" }}
                  className={classes.formControl}
                  label="Subject:"
                  type="text"
                  onChange={(e) =>
                    addMsg({ ...message, subject: e.target.value })
                  }
                  value={message.subject}
                  variant="outlined"
                  inputProps={{ maxLength: 15 }}
                />
                <TextField
                  style={{ marginTop: "10px" }}
                  className={classes.formControl}
                  label="Send a Message"
                  multiline
                  onChange={handleChange}
                  rows={7}
                  onChange={(e) => addMsg({ ...message, msg: e.target.value })}
                  value={message.msg}
                  name="message"
                  variant="outlined"
                />
                <Button style={{ marginTop: "10px" }} onClick={handleClick}>
                  Submit
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Home;
