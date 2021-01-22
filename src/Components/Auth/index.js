import React from 'react'
import {Route, Switch} from 'react-router-dom'
import LoggedOutNavbar from '../layouts/loggedoutNavbar'
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Options from './Options';

import VerifyCode from './VerifyCode';
import ResetPassword from './ResetPassword';


function Index() {
    return (
        <>
            <LoggedOutNavbar/>
            <Switch>
                <Route path="/" component={Login}/>
                <Route path="/forgot" component={ForgotPassword}/>
                <Route path="/VerifyCode" component={VerifyCode}/>
                <Route path="/Options" component={Options}/>
                <Route path="/ResetPassword" component={ResetPassword}/>
            </Switch>
            {/* <Login/>   */}
        </>
    )
}

export default Index