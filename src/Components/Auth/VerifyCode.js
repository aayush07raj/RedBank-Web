import React from 'react'
import {Link} from 'react-router-dom'

import verifyCode from './images/verifyCode.png'
import LoggedOutNavbar from '../layouts/loggedoutNavbar'

import { Grid, Paper, TextField, Button} from '@material-ui/core'

function VerifyCode(){

    const paperStyle ={display:'flex', width:380, flexDirection: 'column', padding: '30px'}
    const margin = {marginTop: "20px"}

    return(
        <>
        <LoggedOutNavbar/>
        <Grid container style={{marginTop:"100px",backgroundColor:'#E94364'}}  >

            <Grid item xs={6} container justify='center' alignItems='center'>
              <img src={verifyCode} alt='verify' style={{width:'80%'}} />
            </Grid>

            <Grid item xs={6} container justify='center' alignItems='center'>
                <Paper elevation={5} style={paperStyle}>
                    <Grid align="center">                     
                        <h2 style={{marginTop:"20px"}}>Enter the code</h2>
                        <p style={margin}>If the entered email address matches any account registered with us, we will send u a mail. So, Check your Mailbox</p>
                        <TextField label="Enter the code sent" fullWidth required style={margin}/>
                        <Button variant="contained" style={{marginTop:'20px',backgroundColor:'#E94364'}} >
                            <Link to="/ResetPassword">Verify</Link>
                        </Button>     
                    </Grid>             
                </Paper>
            </Grid>

        </Grid>
        </>
    )
}


export default VerifyCode;