import React from 'react'

import {Link} from 'react-router-dom'

import {Avatar, Grid, Paper, TextField, FormControlLabel, Checkbox, Button, Typography} from '@material-ui/core'

function Options(){

    const paperStyle = {padding :20, height: '30vh', width: 380, margin: "80px auto"}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const margin = {marginTop: "20px"}

    return(
        <Grid >
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">                     
                    <h2 style={{marginTop:"20px"}}>Type of User</h2>
                    <Typography style={margin}>
                       <Link to="/Test">Individual</Link>                     
                    </Typography>                       
                    <Typography style={margin}>
                        <Link to="/">Blood Bank</Link>
                    </Typography>
                    <Typography style={margin}>
                        <Link to="/">Hospital/Clinic</Link>
                    </Typography>
                    <Typography style={margin}>
                        <p>Existing user ? <Link to="/">Sign in</Link></p>                        
                    </Typography>
                </Grid>             
            </Paper>
        </Grid>
    )
}


export default Options;