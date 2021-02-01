import React from "react";
import {Navbar, Footer } from "../../../layouts";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Container,
    Grid,
    // makeStyles,
    // Paper,
    Typography,
    Divider,
  } from "@material-ui/core";

// const useStyles =makeStyles({
//     table:{
//         // margin: ThemeProvider.spacing(3),
//         minWidth: 650,
//     }, 
// });


const useStyles = makeStyles((theme) => ({
    paper: {
      width: "100%",
  
      flexDirection: "column",
      margin: "auto",
      padding: theme.spacing(4),
    },
    table: {
        minWidth: 650,
    },
  }));


function DriveList(){
    const classes = useStyles();
    return(
        <>
            <Navbar/> 
            <Paper square elevation={5} className={classes.paper}>
        <Typography variant="h4">My Commitments</Typography>
        <Divider />
        <Typography variant="h6">
          Here you can view all the types of donations you have done since your
          registration
        </Typography>
      </Paper>
      <Container maxWidth="lg">
        <Grid container justify="center" className={classes.table}>
          <Grid item xs={12}>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow> */}
          {/* ))} */}
        {/* </TableBody> */}
      </Table>
    </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Footer />    
    </>
    )
}

export default DriveList;