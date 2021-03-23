import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    paperStyle:{
        height: "auto",
        width: "450px",
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        [theme.breakpoints.down("sm")]:{
            width: "100%",
          }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    margin:{
        marginTop: "15px"
    },
    container:{
        margin:"20px auto"
    },
    header:{
        marginTop:"10px",
        alignContent:"center"
    },
    link:{
        color:"#E94364",
        fontWeight: "bold"
    },
    button:{
        backgroundColor: "#E94364",
        marginTop: "20px",
        color: "white"
    },
    progress:{
        color: "#E94364",
        marginRight: "10px" 
    },
    image:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
          }
    },


}))