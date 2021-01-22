import { Grid, Paper, TextField, Select, MenuItem, InputLabel, FormControl, Button, FormControlLabel, Checkbox, Typography} from '@material-ui/core'
import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import individual from './images/individual.png'
import states from './states.json'
import Joi from 'joi'
import LoggedOutNavbar from '../layouts/loggedoutNavbar'



function IndividualRegistration(){

    const[state,setState] = useState({
        
        data :{fName:'', email:'', dob:'', phone:'', address:'', state:'', district:'', pincode:'',bg:'', password:'', cPassword:'', checked:false},
        errors :{}
    })

    
    const[enable, setEnable] = useState(true);
    const[selectedStateIndex, setSelectedStateIndex] = useState(0);

    const paperStyle = {height:'auto', width:'450px', display:'flex', flexDirection: 'column', padding:'30px'}
    const margin = {marginTop: "15px"}
    
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
    
      if(name === "state"){
        setEnable(false)      
        setSelectedStateIndex(states.states.findIndex(item => item.state === value));
      }    

      if(name === "checked"){
        setState( prevState => ({
          ...prevState,
          [name] : e.target.checked
        }))
      }

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

    const handleClick = () => {
      
      const errors = validate()

     setState({ errors: errors || {} })
      if (errors) return

      console.log(state)
    }

    
    

    const schema = {
        fName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
        dob: Joi.required(),
        phone: Joi.required(),
        address: Joi.required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        pincode: Joi.number().required(),
        bg: Joi.required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), 
        checked: Joi.boolean().required(), 
      }



    return(
        <>
        <LoggedOutNavbar/>
       
        <Grid container style={{margin:"20px auto"}}>

            
            <Grid item xs={6} container justify='center' alignItems='center'>  
               <img src={individual} alt='individual' style={{maxWidth:'100%'}}/>                                    
            </Grid>

            <Grid item xs={6} container justify='center' alignItems='center'>               

            <Paper style={paperStyle} elevation={5} >
                <h2 style={{marginTop:"10px"}} align='center'>Individual Registration</h2>

                <TextField label="Name" placeholder="Enter your full name" type="text" fullWidth required style={margin}  name='fName' value={state.data.fName} onChange={handleChange}/> 
                <p style={{color:'red'}}>{state.errors.fName}</p>
               
                <TextField label="Email" placeholder="Enter your email" type="email" fullWidth required  style={margin} name='email' value={state.data.email} onChange={handleChange} />
                <p style={{color:'red'}}>{state.errors.email}</p>

                <InputLabel  style={{marginTop:'20px'}} >Date of Birth*</InputLabel>
                <TextField  type="date" fullWidth required  style={margin} name='dob' value={state.data.dob} onChange={handleChange} />
                <p style={{color:'red'}}>{state.errors.dob}</p>

                <TextField label="Phone" placeholder="Enter your phone number" type="number" fullWidth required style={margin} name='phone' value={state.data.phone} onChange={handleChange}/>
                <p style={{color:'red'}}>{state.errors.phone}</p>

                <TextField label="Current Address" placeholder="Enter your current address" type="text" fullWidth required style={margin} name='address' value={state.data.address} onChange={handleChange}/> 
                <p style={{color:'red'}}>{state.errors.address}</p>

                <FormControl style={margin}>
                <InputLabel >State</InputLabel>
                <Select
                    name='state'  onChange={handleChange} value={state.data.state} > 
                    { states.states.map( (item) => (
                    <MenuItem value={item.state}>{item.state}</MenuItem>
                   ))
                   }

                </Select>
                </FormControl>
                <p style={{color:'red'}}>{state.errors.state}</p>

                <FormControl style={margin} >
                <InputLabel>District</InputLabel>
                <Select                     
                    inputProps={{ readOnly: enable }}
                    name='district' onChange={handleChange} value={state.data.district}>
                    { states.states[selectedStateIndex].districts.map( item => (
                    <MenuItem value={item}>{item}</MenuItem>
                   ))}
                </Select>
                </FormControl>
                <p style={{color:'red'}}>{state.errors.district}</p>

                <TextField label="Pincode" placeholder="Enter your pincode" type="number" fullWidth required  style={margin} name='pincode' value={state.data.pincode} onChange={handleChange} />
                <p style={{color:'red'}}>{state.errors.pincode}</p>

                <FormControl style={margin}>
                <InputLabel required>Blood Group</InputLabel>
                <Select 
                    name='bg' onChange={handleChange} value={state.data.bg}>
                    <MenuItem value={'A+'}>A+</MenuItem>
                    <MenuItem value={'A-'}>A-</MenuItem>
                    <MenuItem value={'B+'}>B+</MenuItem>
                    <MenuItem value={'B-'}>B-</MenuItem>
                    <MenuItem value={'AB+'}>AB+</MenuItem>
                    <MenuItem value={'AB-'}>AB-</MenuItem>
                    <MenuItem value={'O+'}>O+</MenuItem>
                    <MenuItem value={'O-'}>O-</MenuItem>
                </Select>
                </FormControl>
                <p style={{color:'red'}}>{state.errors.bg}</p>
                
                <TextField label="Password" placeholder="Create your password" type="password" fullWidth required  style={margin} name='password' value={state.data.password} onChange={handleChange}/>
                <p style={{color:'red'}}>{state.errors.password}</p>

                <TextField label="Confirm Password" placeholder="Confirm your password" type="password" fullWidth required style={margin} name='cPassword' value={state.data.cPassword} onChange={handleChange}/>
                <p style={{color:'red'}}>{state.errors.cPassword}</p>
                
                <FormControlLabel 
                    style={margin}
                    control={<Checkbox checked={state.data.checked} name="checked" onChange={handleChange} />}
                    label="Accept T&C"
                />
               
                <Button variant="contained" style={{backgroundColor:'#E94364',marginTop: "20px"}} onClick={handleClick} disabled={validate()}> <Link to='/Login'>Sign up</Link></Button>

                <Typography align='center' style={margin}>
                    <Link to="/Login">Already a user ? Sign in</Link>
                </Typography>

            </Paper>


            </Grid>            
        </Grid>
        
        </>
    )
}


export default IndividualRegistration



