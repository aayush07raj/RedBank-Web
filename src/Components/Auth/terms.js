import React from 'react';
import {Link} from 'react-router-dom'

import {Grid, Paper, TextField, Button} from '@material-ui/core'
import LoggedOutNavbar from '../layouts/loggedoutNavbar';
import TnC from './images/TnC.png';

const paperStyle ={display:'flex', width:580,height: 500, flexDirection: 'column', padding: '30px'}
    const margin = {marginTop: "20px"}


function Terms(){

    
    return(
        <>
        <LoggedOutNavbar/>
        <Grid container style={{marginTop:"100px",backgroundColor:'#E94364'}} >

        <Grid item xs={6} container justify='center' alignItems='center'>
              <img src={TnC} alt='fgtpwd' width='800px' height='600px'/>
            </Grid>

            <Grid item xs={6} container justify='center' alignItems='center'> 
                <Paper elevation={5} style={paperStyle}>
                    <Grid align="center">                     
                        <h2 style={{marginTop:"20px"}}>Terms & Condition</h2>
                        <h6 style={margin}>*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has</h6>
                        <h6 style={margin}>*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has</h6>
                        <h6 style={margin}>*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has</h6>
                        <h6 style={margin}>*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has</h6>

                    </Grid>             
                </Paper>
            </Grid>

        </Grid>
        </>
    )
}

export default Terms;