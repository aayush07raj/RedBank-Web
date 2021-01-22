import React from 'react'
import {Link} from 'react-router-dom'

import forgotPwd from './images/forgotPwd.png'
import LoggedOutNavbar from '../layouts/loggedoutNavbar'

import {Grid, Paper, TextField, Button} from '@material-ui/core'

function ForgotPassword(){

    const paperStyle ={display:'flex', width:380, flexDirection: 'column', padding: '30px'}
    const margin = {marginTop: "20px"}

    return(
        <>
        <LoggedOutNavbar/>
        <Grid container style={{marginTop:"100px",backgroundColor:'#E94364'}} >

            <Grid item xs={6} container justify='center' alignItems='center'>
              <img src={forgotPwd} alt='fgtpwd' width='800px' height='600px'/>
            </Grid>

            <Grid item xs={6} container justify='center' alignItems='center'> 
                <Paper elevation={5} style={paperStyle}>
                    <Grid align="center">                     
                        <h2 style={{marginTop:"20px"}}>Find your Account</h2>
                        <p style={margin}>Help us find your account by entering your registered email.</p>
                        <TextField label="Recovery Email" fullWidth required style={margin}/>
                        <Button variant="contained" style={{marginTop:'20px',backgroundColor:'#E94364'}} >
                            <Link to="/VerifyCode">Next</Link>
                        </Button>           
                    </Grid>             
                </Paper>
            </Grid>

        </Grid>
        </>
    )
}


export default ForgotPassword;