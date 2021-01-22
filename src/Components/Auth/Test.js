import React from 'react'

import {Link} from 'react-router-dom'

import {Avatar, Grid, Paper, TextField, FormControlLabel, Checkbox, Button, Typography} from '@material-ui/core'

function Test(){

    const paperStyle = {padding :20, height: 140, width:100}
   
    

    return(
        <Grid container >
            <Grid item xs={12} >
                <Grid container direction="row" justify="center" alignItems="center" >        
                    <Paper elevation={10} style={paperStyle}>
                        <h1>HI</h1>    
                    </Paper>
                    <Paper elevation={10} style={paperStyle}>
                        <h1>HI</h1>    
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default Test;