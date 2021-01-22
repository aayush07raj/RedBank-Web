import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import login from './images/login.png'
import avatar from './images/avatar.png'
import {Grid, Paper, TextField, FormControlLabel, Checkbox, Button, Typography} from '@material-ui/core'

function Login(props){

    const[state,setState]=useState({email:'', password:'', isLoggedin:false })

    const paperStyle ={display:'flex', width:380, flexDirection: 'column', padding: '30px'}
    const margin = {marginTop: "20px"}
    

    const handleSubmit = () => {
        setState(prevState=>({
            isLoggedin:  !prevState.isLoggedin
        })
        )
        console.log(this.state.isLoggedin)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClick = () => {
        setState({email:'',password:''})
        console.log(state)
    }

    return(
        <Grid container style={{marginTop:"100px"}}>

            <Grid item xs={6} align='center'>               
                    <img src={login} alt='login' />                       
            </Grid>

            <Grid item xs={6} align='center'>               
                        <Paper style={paperStyle} elevation={5} >
                                <Grid align="center"> 
                                <img src={avatar} width="80px"/>
                                    <h2 style={{marginTop:"10px"}}>Sign In</h2>
                                </Grid>

                                <TextField 
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                fullWidth
                                required                                                            
                                style={margin}
                                name='email'
                                value={state.email}
                                onChange={handleChange} /> 

                                <TextField
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                fullWidth
                                required                                
                                style={margin}
                                name='password'
                                value={state.password}
                                onChange={handleChange}/> 

                                <Typography style={margin}>
                                    <Link to="/forgot">Forgot password</Link>
                                </Typography>

                                <Button 
                                onClick= {handleSubmit}variant="contained" color="primary" fullWidth style={margin} onClick={handleClick} >
                                <Link to="/home" style={{color:'white'}}>Login</Link>
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
    )
}


export default Login;