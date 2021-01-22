import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to="/">About</NavLink></li>
            <li><NavLink to="/">Services</NavLink></li>
            <li><NavLink to="/" >Profile</NavLink></li>
        </ul>
    )
}
export default SignedInLinks;