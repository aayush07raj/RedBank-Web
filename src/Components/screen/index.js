import React from 'react'
import {Route, Switch} from 'react-router-dom'
import { Navbar } from '../layouts'
import Home from './home';


function index() {
    return (
        <div>
            <Navbar/>
            <Home/>    
        </div>
    )
}

export default index