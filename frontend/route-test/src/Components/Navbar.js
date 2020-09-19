import React from 'react';
import '../Styles/Navbar.css'

export default function Navbar() {
    return(
        <>
        <div className="navbar">
            <div className="navbar-item">Home</div>
            <div className="navbar-item">Sessions</div>
            <div className="navbar-item">Reports</div>
        </div>
        <div className="nav-menu">Menu</div>
        </>
    )
}