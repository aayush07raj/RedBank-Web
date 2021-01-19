import React from 'react'
import {Link} from 'react-router-dom'


import login from './images/login.png'
import avatar from './images/avatar.png'


import {Avatar, Grid, Paper, TextField, FormControlLabel, Checkbox, Button, Typography} from '@material-ui/core'



function Login(){


    const paperStyle = {padding :30, height: '65vh', width: 380, margin: "150px auto"}
    const margin = {marginTop: "20px"}

    return(
        <>
       
        <Grid container>

            <Grid item xs={6} >
            <img src={login} style={{margin: "100px"}}/>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={10} style={paperStyle}>
                        <Grid align="center"> 
                        <img src={avatar} width="80px"/>
                            <h2 style={{marginTop:"10px"}}>Sign In</h2>
                        </Grid>
                        <TextField label="Email" placeholder="Enter your email" type="email" fullWidth required style={margin}/> 
                        <TextField label="Password" placeholder="Enter your password" type="password" fullWidth required style={margin}/> 

                        <Typography style={margin}>
                            <Link to="/ForgotPassword">Forgot password</Link>
                        </Typography>

                        <FormControlLabel
                            control={
                            <Checkbox
                                name="checkedB"
                                color="primary"                                
                            />
                            }
                            label="Remember Me"
                            style={margin}
                        />
                    <Button variant="contained" color="primary" fullWidth style={margin}>
                    <Link to="/" style={{color:'white'}}>Login</Link>
                    </Button>
                    

                    <Grid align="center">
                            <Typography style={margin}>
                                <p>New user ? <Link to="/Options">Sign up</Link></p>                        
                            </Typography>
                            <h3 style={margin}>OR</h3>                        
                            <Typography style={margin}>
                                <Link to="/Options">Sign in with google account</Link>
                            </Typography>
                    </Grid>
                    
                </Paper>
            </Grid>

        </Grid>
        </>
    )
}


export default Login;