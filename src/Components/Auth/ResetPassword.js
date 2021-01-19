import React from 'react'

import {Link} from 'react-router-dom'

import {Avatar, Grid, Paper, TextField, FormControlLabel, Checkbox, Button, Typography,Modal} from '@material-ui/core'

function ResetPassword(){

    const paperStyle = {padding :20, height: '40vh', width: 400, margin: "80px auto"}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const margin = {marginTop: "20px"}

   
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">                     
                    <h2 style={{marginTop:"20px"}}>Reset your Password</h2>
                    <p style={margin}>create a new password</p>
                    <TextField label="Enter a new password" fullWidth required style={margin}/>
                    <TextField label="Confirm the new password" fullWidth required style={margin}/>
                    <Button variant="contained" style={margin} onClick={()=>{window.alert("Password changed successfully. You can log into your account")}} >
                        <Link to="/">Reset</Link>
                    </Button> 
                </Grid>             
            </Paper>
        </Grid>
    )
}


export default ResetPassword;