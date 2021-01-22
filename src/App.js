// import React, {useState} from 'react';
// import {Route, Switch} from 'react-router-dom'
// import Index from './Components/Auth/index';
// // import Home from './Components/screen/home';
// import Home from './Components/screen/index'
// // import ForgotPassword from './Components//ForgotPassword';
// // import ForgotPassword from './ForgotPassword';

// function App(){

//   return(
//     <>
//     <Switch>
//       <Route exact path="/home" component={Home}/>
//       {/* <Route path="/forgot" component={ForgotPassword}/> */}
//       <Route exact path='/' component={Index}  />
//     </Switch>
//     </>
//   )
//   }


// export default App









import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import index from './index.css';

import Login from './Components/Auth/Login';
import Options from './Components/Auth/Options';
import ForgotPassword from './Components/Auth/ForgotPassword';
import VerifyCode from './Components/Auth/VerifyCode';
import ResetPassword from './Components/Auth/ResetPassword';
import IndividualRegistration from './Components/Auth/IndividualRegistration';
import HospitalRegistration from './Components/Auth/HospitalRegistration';
import BloodBankRegistration from './Components/Auth/BloodBankRegistration';
import Home from './Components/screen/index'

import Test from './Components/Auth/Test';




function App(){
  return(
    <> 
    <Switch>
    <Route exact path="/home" component={Home}/>
      <Route exact path='/' component={Login}/>
      <Route exact path='/ForgotPassword' component={ForgotPassword}/>
      <Route exact path='/VerifyCode' component={VerifyCode}/>
      <Route exact path='/ResetPassword' component={ResetPassword}/>
      <Route exact path='/Options' component={Options}/>
      <Route exact path='/IndividualRegistration' component={IndividualRegistration}/>
      <Route exact path='/HospitalRegistration' component={HospitalRegistration}/>
      <Route exact path='/BloodBankRegistration' component={BloodBankRegistration}/>
      <Route exact path='/Login' component={Login}/>

      <Route exact path='/Test' component={Test}/>
    </Switch>
    </>
  )
}



export default App



