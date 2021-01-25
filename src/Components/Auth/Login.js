import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import login from './images/login.png'
import avatar from './images/avatar.png'
import {Grid, Paper, TextField, FormControlLabel, Checkbox, Button, Typography} from '@material-ui/core'
import LoggedOutNavbar from '../layouts/loggedoutNavbar'
import Joi from 'joi';

function Login(){

    const[state,setState]=useState({ data:{email:'', password:'',}, errors :{} })

    const paperStyle ={display:'flex', width:380, flexDirection: 'column', padding: '30px'}
    const margin = {marginTop: "20px"}

    const schema = {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
        password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("Enter a stronger password")
      .required(),
    };
    
    const handleClick = () => {
      
        const errors = validate()
  
       setState({ errors: errors || {} })
        if (errors) return
  
        console.log(state)
      }
  
    const validateProperty = ({ name, value }) => {
        const inputField = { [name]: value }
        const fieldSchema = Joi.object({ [name]: schema[name] })
        const { error } = fieldSchema.validate(inputField)
        return error ? error.details[0].message : null
    }

    const validate = () => {
        const formSchema = Joi.object(schema)
        const { error } = formSchema.validate(state.data, {
          abortEarly: false,
        })
    
        if (!error) return null
    
        const errors = {}
        for (let err of error.details) {
          errors[err.path[0]] = err.message
        }
        return errors
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        const errors = { ...state.errors }
      const errorMsg = validateProperty(e.target)
      if (errorMsg) {
        errors[e.target.name] = errorMsg
      } else {
        delete errors[e.target.name]
      }
      const data = { ...state.data }
      data[e.target.name] = e.target.value
      setState({ data, errors })
    };

    return(
        <>
        <LoggedOutNavbar/>
        
        <Grid container style={{marginTop:"100px",backgroundColor:'#E94364'}}>

            <Grid item xs={6} container justify='center' alignItems='center' >               
                    <img src={login} alt='login' />                       
            </Grid>

            <Grid item xs={6} container justify='center' alignItems='center'>               
                        <Paper style={paperStyle} elevation={5} >
                                <Grid align="center"> 
                                <img src={avatar} width="80px"/>
                                    <h2 style={{marginTop:"10px"}}>Sign In</h2>
                                </Grid>

                                <TextField 
                                label="Email"
                                placeholder="Enter your email"
                                // type="email"
                                fullWidth
                                required   
                                variant="outlined"                                                         
                                style={margin}
                                name='email'
                                value={state.email}
                                onChange={handleChange} 
                                error={state.errors && state.errors.email}
              helperText={
                state.errors && state.errors.email ? state.errors.email : null
              }
                                
                                />
                                {/* <p style={{color:'red'}}>{state.errors.email}</p>  */}

                                <TextField
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                fullWidth
                                required    
                                variant="outlined"                             
                                style={margin}
                                name='password'
                                value={state.password}
                                onChange={handleChange}
                                error={state.errors && state.errors.password}
              helperText={
                state.errors && state.errors.password
                  ? state.errors.password
                  : null
              }
                                /> 
                                {/* <p style={{color:'red'}}>{state.errors.password}</p> */}

                                <Typography style={margin}>
                                    <Link to="/ForgotPassword">Forgot password</Link>
                                </Typography>

                                <Button variant="contained" color="primary" fullWidth style={{marginTop:'20px',backgroundColor:'#E94364'}} onClick={handleClick} disabled={validate()} >
                                    <Link to="/home" >
                                    Login
                                    </Link>
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