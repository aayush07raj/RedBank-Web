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
    },
    // Loader CSS 
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

    // My Analytics
    charts: {
      margin: theme.spacing(3),
    },
    tabs: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(2),
    },

    // Invoice
    typo: {
      padding: "10px",
    },
    table2:{
      margin: theme.spacing(10),
      width: "80%",
    },
    note: {
          fontWeight: "bold",
          color: "#e94364",
          marginTop: "20px",
    },

    // Product
    button: {
          backgroundColor: "#e94364",
          color: "white",
          marginTop: "20px",
    },
}) )