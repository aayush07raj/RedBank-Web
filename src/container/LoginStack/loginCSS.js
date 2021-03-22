import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({

// Login
    container:{
        marginTop:"100px",
        backgroundColor:"#E94364"
    },
    paperStyle: {
        display: "flex",
        width: 380,
        flexDirection: "column",
        padding: "30px",
    },
    margin:{
        marginTop: "20px"  
    },
    button:{
        marginTop:"20px",
        backgroundColor:"#E94364",   
        color: "white"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    circularProgress:{
        color: "#E94364",
         marginRight: "10px" 
    },

    image:{
        // justify:"center",
        // alignItems:"center",
        [theme.breakpoints.down("sm")]:{
            display:"none"
          }
    }
}))