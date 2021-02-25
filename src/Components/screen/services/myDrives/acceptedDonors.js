import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core/";
import { Navbar, Footer } from "../../../layouts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(7),
  },
}));

export default function AcceptedDonors(props) {
  const { donorsList, setDonors, drivesList } = props.location;
  const classes = useStyles();
  const loggedInState = useSelector((state) => state.loggedIn);

  console.log(props.location);

  const handleClick = (idx) => {
    if (window.confirm("Are you sure ?")) {
      axios
        .put(
          "http://localhost:8080/mydrives/drivedonorverification",
          {
            driveId: drivesList[idx].driveId,
            userId: donorsList[idx].userId,
          },
          {
            headers: {
              Authorization: "Bearer " + loggedInState.userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          var updatedList = [...donorsList];
          updatedList[idx].donationStatus = false;
          setDonors(updatedList);
        });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" align="center">
          List of all Donors
        </Typography>
        <TableContainer component={Paper} className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Donor Id</StyledTableCell>
                <StyledTableCell align="center">Donor Name</StyledTableCell>
                <StyledTableCell align="center">Blood Group</StyledTableCell>
                <StyledTableCell align="center">
                  Donation Status
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donorsList.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{row.userId}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.bloodGroup}</TableCell>
                  <TableCell align="center">
                    <Button
                      disabled={donorsList[idx].donationStatus}
                      variant="contained"
                      color="secondary"
                      onClick={(e) => handleClick(idx)}
                    >
                      Given ?
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}
