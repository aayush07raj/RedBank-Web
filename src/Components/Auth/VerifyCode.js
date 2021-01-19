import React from 'react'
import {Link} from 'react-router-dom'

import verifyCode from './images/verifyCode.png'

import { Grid, Paper, TextField, Button} from '@material-ui/core'

function VerifyCode(){

    const paperStyle = {padding :20, height: '30vh', width: 400, margin: "150px auto"}
    const margin = {marginTop: "20px"}

    return(
        <Grid container >

            <Grid item xs={6} >
              <img src={verifyCode} style={{margin: "100px", width:'90%'}}/>
            </Grid>

            <Grid item xs={6}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">                     
                        <h2 style={{marginTop:"20px"}}>Enter the code</h2>
                        <p style={margin}>If the entered email address matches any account registered with us, we will send u a mail. So, Check your Mailbox</p>
                        <TextField label="Enter the code sent" fullWidth required style={margin}/>
                        <Button variant="contained" style={margin} >
                            <Link to="/ResetPassword">Verify</Link>
                        </Button>     
                    </Grid>             
                </Paper>
            </Grid>

        </Grid>
    )
}


export default VerifyCode;