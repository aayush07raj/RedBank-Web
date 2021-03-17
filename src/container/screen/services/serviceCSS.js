import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>({

    // Buy Blood, Find Donor, My Donation Req, My Commitment
    heading: {
        marginBottom: theme.spacing(2),
        
      },
      inline:{
        display: "inline-block"
      },
      paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(5),
        width: "550px",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("xs")]:{
          width:"100%"
        }
      },
      papers: {
        width: "100%",
        flexDirection: "column",
        margin: "auto",
        padding: theme.spacing(2),
      },
      formControl: {
        marginTop: theme.spacing(3),
        minWidth: 250,
      },
      tableContainer: {
        marginTop: theme.spacing(9),
        marginBottom: theme.spacing(3),
      },
      tables: {
        padding: theme.spacing(3),
      },

    //   Find Donor
      form: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(5),
        width: "550px",
        display: "flex",
        flexDirection: "column",
      },

    //   My Donation Req 
    table:{
        marginTop: "50px",
    }
    
}) )