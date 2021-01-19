import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import index from './index.css';

import Login from './Components/Auth/Login';
import Options from './Components/Auth/Options';
import ForgotPassword from './Components/Auth/ForgotPassword';
import VerifyCode from './Components/Auth/VerifyCode';
import ResetPassword from './Components/Auth/ResetPassword';

import Test from './Components/Auth/Test';


function App(){
  return(
    <>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/Options' component={Options}/>
      <Route exact path='/ForgotPassword' component={ForgotPassword}/>
      <Route exact path='/VerifyCode' component={VerifyCode}/>
      <Route exact path='/ResetPassword' component={ResetPassword}/>

      <Route exact path='/Test' component={Test}/>
    </Switch>
    </>
  )
}



export default App