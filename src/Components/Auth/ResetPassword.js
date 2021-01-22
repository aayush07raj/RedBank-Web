import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Paper, TextField, Button} from '@material-ui/core'
import resetPwd from './images/resetPwd.png'
import LoggedOutNavbar from '../layouts/loggedoutNavbar'

function ResetPassword(){

    const paperStyle ={display:'flex', width:380, flexDirection: 'column', padding: '30px'}
    const margin = {marginTop: "20px"}

   
    return(
        <>
        <LoggedOutNavbar/>
        <Grid container style={{marginTop:"100px",backgroundColor:'#E94364'}}>

            <Grid item xs={6} container justify='center' alignItems='center'>
                <img src={resetPwd} alt='reset' width='600px' height='600px'/>                
            </Grid>

            <Grid item xs={6} container justify='center' alignItems='center'>
                <Paper elevation={5} style={paperStyle}>
                    <Grid align="center">                     
                        <h2 style={{marginTop:"20px"}}>Reset your Password</h2>
                        <p style={margin}>create a new password</p>
                        <TextField label="Enter a new password" fullWidth required style={margin}/>
                        <TextField label="Confirm the new password" fullWidth required style={margin}/>
                        <Button variant="contained" style={{marginTop:"20px",backgroundColor:'#E94364'}} onClick={()=>{window.alert("Password changed successfully. You can log into your account")}} >
                            <Link to="/" >Reset</Link>
                        </Button> 
                    </Grid>             
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}


export default ResetPassword;