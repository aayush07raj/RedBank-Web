import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import Index from './Components/Auth/index';
// import Home from './Components/screen/home';
import Home from './Components/screen/index'
// import ForgotPassword from './Components//ForgotPassword';
// import ForgotPassword from './ForgotPassword';

function App(){

  return(
    <>
    <Switch>
      <Route exact path="/home" component={Home}/>
      {/* <Route path="/forgot" component={ForgotPassword}/> */}
      <Route exact path='/' component={Index}  />
    </Switch>
    </>
  )
  }


export default App