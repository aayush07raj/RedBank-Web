import React from 'react'
import {Link} from 'react-router-dom'

import forgotPwd from './images/forgotPwd.png'

import {Grid, Paper, TextField, Button} from '@material-ui/core'

function ForgotPassword(){

    const paperStyle = {padding :20, height: '30vh', width: 400, margin: "150px auto"}
    const margin = {marginTop: "20px"}

    return(
        <Grid container>

            <Grid item xs={6} >
              <img src={forgotPwd} style={{margin: "100px", width:'80%'}}/>
            </Grid>

            <Grid item xs={6}> 
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">                     
                        <h2 style={{marginTop:"20px"}}>Find your Account</h2>
                        <p style={margin}>Help us find your account by entering your registered email.</p>
                        <TextField label="Recovery Email" fullWidth required style={margin}/>
                        <Button variant="contained" style={margin} >
                            <Link to="/VerifyCode">Next</Link>
                        </Button>           
                    </Grid>             
                </Paper>
            </Grid>

        </Grid>
    )
}


export default ForgotPassword;